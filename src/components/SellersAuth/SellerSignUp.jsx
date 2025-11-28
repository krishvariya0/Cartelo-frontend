import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import {
    addDoc,
    collection,
    getDocs,
    query,
    where
} from "firebase/firestore";
import { db } from "../../utils/firebase"; // make sure db exported

function SellerSignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // state to hold currently active session user (if any)
  const [activeSessionUser, setActiveSessionUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // Check Firestore activeSessions for an active seller session
    const checkActiveSession = async () => {
      try {
        setCheckingSession(true);
        const sessionsRef = collection(db, "activeSessions");
        const snap = await getDocs(sessionsRef);

        // pick any active seller session (if exists)
        let found = null;
        snap.forEach((doc) => {
          const s = doc.data();
          if (s.userType === "seller" && s.isActive === true) {
            found = s.userData || { email: s.userEmail, id: s.userId }; // tolerate different shapes
          }
        });

        if (found) setActiveSessionUser(found);
      } catch (err) {
        console.error("Unable to read active sessions:", err);
      } finally {
        setCheckingSession(false);
      }
    };

    checkActiveSession();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (creating) return;
      setCreating(true);

      // 1) If there is an active logged-in user, and their email != form email, reject
      if (activeSessionUser && activeSessionUser.email && activeSessionUser.email.toLowerCase() !== data.email.toLowerCase()) {
        toast.error(
          `You are currently logged in as "${activeSessionUser.email}". Log out first or use the same email to create a seller account.`
        );
        setCreating(false);
        return;
      }

      // 2) Check uniqueness in Firestore: email OR mobile OR GST must not exist
      const sellersRef = collection(db, "sellers");

      // Query by email
      const qEmail = query(sellersRef, where("email", "==", data.email.toLowerCase()));
      const snapEmail = await getDocs(qEmail);
      if (!snapEmail.empty) {
        toast.error("An account with this email already exists.");
        setCreating(false);
        return;
      }

      // Query by mobile
      const qMobile = query(sellersRef, where("mobile", "==", data.mobile));
      const snapMobile = await getDocs(qMobile);
      if (!snapMobile.empty) {
        toast.error("An account with this mobile number already exists.");
        setCreating(false);
        return;
      }

      // Query by GST
      const qGst = query(sellersRef, where("GST", "==", data.GST));
      const snapGst = await getDocs(qGst);
      if (!snapGst.empty) {
        toast.error("An account with this GST number already exists.");
        setCreating(false);
        return;
      }

      // 3) All checks passed → create seller doc (do NOT store OTP)
      const sellerData = {
        name: data.name,
        email: data.email.toLowerCase(),
        mobile: data.mobile,
        PAN: data.PAN,
        GST: data.GST,
        termsAccepted: !!data.terms,
        createdAt: Date.now()
      };

      await addDoc(sellersRef, sellerData);

      toast.success("Seller account created successfully!");
      setTimeout(() => navigate("/SellerLogin"), 1400);
    } catch (err) {
      console.error("Create seller failed:", err);
      toast.error(err.message || "Could not create seller");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">
      {/* LOGO */}
      <div className="flex items-center justify-center mb-6">
        <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">Cartelo Seller</Link>
      </div>

      {/* CARD */}
      <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Seller Account</h1>

        {/* If checking session, show subtle loading */}
        {checkingSession ? (
          <div className="text-center p-6 text-sm text-gray-500">Checking session...</div>
        ) : (
          <>
            {activeSessionUser && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                You are currently signed in as <strong>{activeSessionUser.email}</strong>.
                If you want to create a seller account for a different email, please log out first.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAME */}
                <div>
                  <label className="text-gray-700 font-medium">Name</label>
                  <input {...register("name", {
                      required: "Name is required",
                      minLength: { value: 3, message: "At least 3 characters" },
                      maxLength: { value: 50, message: "Name too long" },
                      pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
                  })}
                  type="text" placeholder="Enter your name"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2" />
                  {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-gray-700 font-medium">Email</label>
                  <input {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
                  })}
                  type="email" placeholder="Enter your email"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2" />
                  {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                {/* MOBILE */}
                <div>
                  <label className="text-gray-700 font-medium">Mobile</label>
                  <input {...register("mobile", {
                      required: "Mobile number is required",
                      minLength: { value: 10, message: "Must be 10 digits" },
                      maxLength: { value: 10, message: "Must be 10 digits" },
                      pattern: { value: /^[0-9]{10}$/, message: "Only 10 digits allowed" }
                  })}
                  type="text" placeholder="Enter mobile number"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2" inputMode="numeric" />
                  {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
                </div>

                {/* PAN */}
                <div>
                  <label className="text-gray-700 font-medium">PAN Number</label>
                  <input {...register("PAN", {
                      required: "PAN is required",
                      minLength: { value: 10, message: "PAN must be 10 characters" },
                      maxLength: { value: 10, message: "PAN must be 10 characters" }
                  })}
                  type="text" placeholder="ENTER PAN NUMBER"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 uppercase" />
                  {errors.PAN && <p className="error-message">{errors.PAN.message}</p>}
                </div>

                {/* GST */}
                <div>
                  <label className="text-gray-700 font-medium">GST Number</label>
                  <input {...register("GST", {
                      required: "GST is required",
                      minLength: { value: 15, message: "Must be 15 characters" },
                      maxLength: { value: 15, message: "Must be 15 characters" },
                      pattern: { value: /^[0-9A-Z]{15}$/, message: "Invalid GST format" }
                  })}
                  type="text" placeholder="ENTER GST NUMBER"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 uppercase" />
                  {errors.GST && <p className="error-message">{errors.GST.message}</p>}
                </div>

                {/* OTP (NOT STORED) */}
                <div>
                  <label className="text-gray-700 font-medium">OTP</label>
                  <input {...register("OTP", {
                      required: "OTP is required",
                      minLength: { value: 6, message: "OTP must be 6 digits" },
                      maxLength: { value: 6, message: "OTP must be 6 digits" },
                      pattern: { value: /^[0-9]{6}$/, message: "Only 6 digits allowed" }
                  })}
                  type="text" placeholder="Enter OTP"
                  className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2" inputMode="numeric" autoComplete="one-time-code" />
                  {errors.OTP && <p className="error-message">{errors.OTP.message}</p>}
                </div>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" {...register("terms", { required: "You must accept the terms" })} />
                <p className="text-gray-600">
                  By continuing, you agree to Cartelo's{" "}
                  <Link to="/SellerTerms" className="text-blue-600">Terms of Use</Link>{" "}
                  and{" "}
                  <Link to="/SellerPrivacy" className="text-blue-600">Privacy Policy</Link>.
                </p>
              </div>
              {errors.terms && <p className="error-message">{errors.terms.message}</p>}

              {/* BUTTON */}
              <button type="submit" disabled={creating} className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-500 transition">
                {creating ? "Creating..." : "Create Your Seller Account"}
              </button>
            </form>
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default SellerSignUp;
