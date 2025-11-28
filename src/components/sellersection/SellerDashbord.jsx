// SellerDashboard.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Realtime Database imports
import {
  ref as dbRef,
  set as dbSet,
  update as dbUpdate,
  get,
  push,
  remove,
} from "firebase/database";

// Storage imports
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

// Firestore imports (for sessions)
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { db, rtdb, storage } from "../../utils/firebase"; // make sure rtdb, storage, db are exported

function SellerDashboard() {
  const navigate = useNavigate();

  // UI state
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // seller session
  const [seller, setSeller] = useState(null); // { id, name, mobile, ... }
  const [sessionDocId, setSessionDocId] = useState(null); // doc id in activeseller collection

  // product form state
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    // newFiles: File[]
    newFiles: [],
    newPreviews: [],
    // existingImages: [{ url, path }]
    existingImages: [],
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // ---------- Lifecycle: check active session and fetch products ----------
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // 1) find active seller session in Firestore
        const sessionsRef = collection(db, "activeseller");
        const snap = await getDocs(sessionsRef);

        let foundSession = null;
        snap.forEach((d) => {
          const data = d.data();
          if (data.userType === "seller" && data.isActive === true) {
            foundSession = { id: d.id, ...data };
            // stop iterating (Firestore getDocs doesn't support breaking, but we keep first)
          }
        });

        if (!foundSession) {
          // no active session -> require login/auth
          navigate("/SellerAuth", { replace: true });
          return;
        }

        // set seller from session
        const sellerInfo = {
          id: foundSession.userId,
          name: foundSession.userData?.name,
          mobile: foundSession.userData?.mobile,
          GST: foundSession.userData?.GST,
          email: foundSession.userData?.email,
        };

        if (!mounted) return;
        setSeller(sellerInfo);
        setSessionDocId(foundSession.id);

        // 2) fetch products for this seller
        await fetchProductsForSeller(foundSession.userId);
      } catch (err) {
        console.error("Session check failed:", err);
        toast.error("Session check failed");
        navigate("/SellerAuth", { replace: true });
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      // revoke preview URLs
      form.newPreviews.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // ---------- fetch products for seller ----------
  async function fetchProductsForSeller(sellerId) {
    setLoading(true);
    try {
      const snap = await get(dbRef(rtdb, "products"));
      if (!snap.exists()) {
        setProducts([]);
        return;
      }
      const data = snap.val();
      const arr = Object.entries(data || {})
        .map(([id, val]) => ({ id, ...val }))
        .filter((p) => p.sellerId === sellerId)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setProducts(arr);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  // ---------- form helpers ----------
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFilesChange(e) {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );

    // enforce max 4 with existing images count
    const totalAfter = (form.existingImages?.length || 0) + files.length;
    if (totalAfter > 4) {
      toast.error("You can have maximum 4 images per product (existing + new).");
      return;
    }

    if (files.length > 4) {
      toast.error("You can upload maximum 4 new images.");
      return;
    }

    // create previews
    const previews = files.map((f) => URL.createObjectURL(f));
    // revoke previous previews to avoid leaks
    form.newPreviews.forEach((u) => URL.revokeObjectURL(u));

    setForm((f) => ({ ...f, newFiles: files, newPreviews: previews }));
  }

  function removeExistingImageAt(index) {
    const next = [...form.existingImages];
    next.splice(index, 1);
    setForm((f) => ({ ...f, existingImages: next }));
  }

  function removeNewImageAt(index) {
    const nf = [...form.newFiles];
    const np = [...form.newPreviews];

    // revoke objectURL
    URL.revokeObjectURL(np[index]);

    nf.splice(index, 1);
    np.splice(index, 1);
    setForm((f) => ({ ...f, newFiles: nf, newPreviews: np }));
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  function resetForm() {
    // revoke previews
    form.newPreviews.forEach((u) => URL.revokeObjectURL(u));
    setForm({
      id: null,
      name: "",
      price: "",
      description: "",
      newFiles: [],
      newPreviews: [],
      existingImages: [],
    });
    setEditing(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  // ---------- validation ----------
  function validateBeforeSubmit() {
    if (!form.name || !form.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (!form.price || Number(form.price) <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }
    const totalImages = (form.existingImages?.length || 0) + (form.newFiles?.length || 0);
    if (!editing) {
      if (totalImages < 3) {
        toast.error("Please upload at least 3 images (max 4).");
        return false;
      }
    } else {
      if (totalImages < 3) {
        toast.error("Product must have at least 3 images.");
        return false;
      }
    }
    return true;
  }

  // ---------- storage upload: returns [{url, path}] ----------
  function uploadFilesToStorage(productKey) {
    const files = form.newFiles || [];
    if (!files.length) return Promise.resolve([]);

    const uploads = files.map((file, idx) => {
      const path = `sellers/${seller.id}/products/${productKey}/${Date.now()}_${idx}_${file.name}`;
      const sRef = storageRef(storage, path);
      const task = uploadBytesResumable(sRef, file);

      return new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          (snap) => {
            const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setUploadProgress(pct);
          },
          (err) => reject(err),
          async () => {
            try {
              const url = await getDownloadURL(task.snapshot.ref);
              resolve({ url, path });
            } catch (err) {
              reject(err);
            }
          }
        );
      });
    });

    return Promise.all(uploads);
  }

  // ---------- create product ----------
  async function handleCreate(e) {
    e.preventDefault();
    if (!validateBeforeSubmit()) return;

    try {
      // create placeholder to get key
      const newRef = push(dbRef(rtdb, "products"));
      const key = newRef.key;

      setUploadProgress(1);
      const uploaded = await uploadFilesToStorage(key); // [{url,path}, ...]
      setUploadProgress(100);

      const images = uploaded; // store array of objects {url, path}

      const productObj = {
        sellerId: seller.id,
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description || "",
        images,
        createdAt: Date.now(),
      };

      await dbSet(dbRef(rtdb, `products/${key}`), productObj);
      toast.success("Product added!");
      resetForm();
      await fetchProductsForSeller(seller.id);
    } catch (err) {
      console.error("Add product failed:", err);
      toast.error("Add product failed: " + (err.message || ""));
      setUploadProgress(0);
    }
  }

  // ---------- update product ----------
  async function handleUpdate(e) {
    e.preventDefault();
    if (!validateBeforeSubmit()) return;

    try {
      const key = form.id;
      // upload new files
      setUploadProgress(1);
      const uploaded = await uploadFilesToStorage(key); // [{url,path}, ...]
      setUploadProgress(100);

      const finalImages = [...(form.existingImages || []), ...uploaded];

      await dbUpdate(dbRef(rtdb, `products/${key}`), {
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description || "",
        images: finalImages,
        updatedAt: Date.now(),
      });

      toast.success("Product updated!");
      resetForm();
      await fetchProductsForSeller(seller.id);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed: " + (err.message || ""));
    } finally {
      setUploadProgress(0);
    }
  }

  // ---------- submit handler wrapper ----------
  async function onSubmit(e) {
    if (editing) await handleUpdate(e);
    else await handleCreate(e);
  }

  // ---------- prepare edit ----------
  function startEdit(product) {
    setEditing(true);
    setForm({
      id: product.id,
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      newFiles: [],
      newPreviews: [],
      existingImages: product.images || [], // array of {url,path}
    });
    // scroll to top for form visibility
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- delete product (includes deleting storage objects if path present) ----------
  async function handleDelete(prod) {
    const ok = window.confirm("Delete product permanently?");
    if (!ok) return;

    try {
      // delete storage objects (if stored paths exist)
      if (Array.isArray(prod.images)) {
        for (const img of prod.images) {
          if (img && img.path) {
            try {
              await deleteObject(storageRef(storage, img.path));
            } catch (err) {
              // could fail if path doesn't exist or permission; continue
              console.warn("Failed to delete storage object", img.path, err);
            }
          }
        }
      }

      // delete rtdb entry
      await remove(dbRef(rtdb, `products/${prod.id}`));
      toast.success("Product deleted");
      await fetchProductsForSeller(seller.id);
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed: " + (err.message || ""));
    }
  }

  // ---------- logout: set session isActive=false in Firestore ----------
  async function handleLogout() {
    try {
      if (!sessionDocId) {
        // fallback: just navigate away
        navigate("/SellerAuth", { replace: true });
        return;
      }
      const sessionRef = doc(db, "activeseller", sessionDocId);
      await updateDoc(sessionRef, { isActive: false, lastActive: Date.now() });
      // clear local seller state
      setSeller(null);
      setSessionDocId(null);
      navigate("/SellerAuth", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  }

  // ---------- render ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Manage products, images & inventory</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-600">Signed in as</div>
              <div className="font-medium text-gray-900">{seller?.name || "Seller"}</div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Layout: form left, products right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{editing ? "Edit Product" : "Add New Product"}</h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded p-2"
                  placeholder="e.g. Wireless Headphones"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full border rounded p-2"
                />
              </div>

              {/* existing images */}
              {editing && form.existingImages.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Existing Images</label>
                  <div className="flex gap-2 flex-wrap">
                    {form.existingImages.map((img, i) => (
                      <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
                        <img src={img.url} alt={`img-${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImageAt(i)}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Product Images (min 3, max 4)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="mt-1 block w-full"
                />
                <div className="mt-2 flex gap-2 flex-wrap">
                  {form.newPreviews.map((p, i) => (
                    <div key={i} className="relative w-24 h-24 border rounded overflow-hidden">
                      <img src={p} alt={`preview-${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewImageAt(i)}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                  <div style={{ width: `${uploadProgress}%` }} className="h-full bg-green-500" />
                </div>
              )}

              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {editing ? "Update Product" : "Add Product"}
                </button>
                <button type="button" onClick={resetForm} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded">
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Products list */}
          <div className="lg:col-span-2 space-y-6">
            {/* stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-sm text-gray-500">Total Products</div>
                <div className="text-2xl font-bold">{products.length}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-sm text-gray-500">Active Listings</div>
                <div className="text-2xl font-bold">{products.length}</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="text-2xl font-bold">₹0</div>
              </div>
            </div>

            {/* list */}
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Products</h3>
                <div className="text-sm text-gray-500">{products.length} items</div>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No products yet — add your first product.</div>
              ) : (
                <div className="space-y-4">
                  {products.map((p) => (
                    <div key={p.id} className="flex flex-col sm:flex-row gap-4 p-3 border rounded">
                      <div className="w-full sm:w-48 h-40 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        {Array.isArray(p.images) && p.images.length > 0 ? (
                          <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-gray-400">No Image</div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-lg">{p.name}</div>
                            <div className="text-sm text-gray-600 mt-1">₹{p.price}</div>
                          </div>
                          <div className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</div>
                        </div>

                        <p className="text-sm text-gray-700 mt-3 line-clamp-2">{p.description}</p>

                        <div className="mt-4 flex gap-2">
                          <button onClick={() => startEdit(p)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(p)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              if (p.images && p.images.length) {
                                const w = window.open("", "_blank");
                                w.document.write(`<title>${p.name} - Images</title>`);
                                p.images.forEach((img) => {
                                  w.document.write(`<img src="${img.url}" style="max-width:300px;margin:8px;" />`);
                                });
                                w.document.close();
                              } else {
                                toast.info("No images to view");
                              }
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            View Images
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <ToastContainer/>
      </div>
    </div>
  );
}

export default SellerDashboard;
