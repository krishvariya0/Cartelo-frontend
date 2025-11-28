import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const SellerLogin = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const sellersRef = collection(db, "sellers");
            const snapshot = await getDocs(sellersRef);

            let matchedSeller = null;

            snapshot.forEach((sellerDoc) => {
                const seller = sellerDoc.data();
                if (seller.mobile === data.mobile && seller.GST === data.GST) {
                    matchedSeller = { id: sellerDoc.id, ...seller };
                }
            });

            if (!matchedSeller) {
                toast.error("Mobile or GST is incorrect");
                return;
            }

            // CREATE FIRESTORE SESSION
            const sessionId = `seller_${matchedSeller.id}`;
            const sessionRef = doc(db, "activeseller", sessionId);

            await setDoc(sessionRef, {
                userId: matchedSeller.id,
                userType: "seller",
                isActive: true,
                lastActive: Date.now(),
                userData: {
                    name: matchedSeller.name,
                    mobile: matchedSeller.mobile,
                    GST: matchedSeller.GST,
                    email: matchedSeller.email
                }
            });

            toast.success("Login Successful!");

            setTimeout(() => navigate("/SellerDashbord"), 1200);

        } catch (error) {
            console.error(error);
            toast.error("Login failed: " + error.message);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Seller Login
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    
                    {/* Mobile */}
                    <div>
                        <label className="text-gray-700 font-medium">Mobile Number</label>
                        <input
                            {...register("mobile", {
                                required: "Mobile number is required",
                                minLength: { value: 10, message: "Mobile must be 10 digits" },
                                maxLength: { value: 10, message: "Mobile must be 10 digits" },
                                pattern: { value: /^[0-9]{10}$/, message: "Only digits allowed" }
                            })}
                            type="text"
                            placeholder="Enter mobile number"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                        />
                        {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
                    </div>

                    {/* GST */}
                    <div>
                        <label className="text-gray-700 font-medium">GST Number</label>
                        <input
                            {...register("GST", {
                                required: "GST is required",
                                minLength: { value: 15, message: "GST must be 15 characters" },
                                maxLength: { value: 15, message: "GST must be 15 characters" },
                                // pattern: { value: /^[0-9A-Z]{15}$/, message: "Invalid GST format" }
                            })}
                            type="text"
                            placeholder="Enter GST Number"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                        />
                        {errors.GST && <p className="error-message">{errors.GST.message}</p>}
                    </div>

                    {/* OTP */}
                    <div>
                        <label className="text-gray-700 font-medium">OTP</label>
                        <input
                            {...register("otp", {
                                required: "OTP is required",
                                minLength: { value: 6, message: "OTP must be 6 digits" },
                                maxLength: { value: 6, message: "OTP must be 6 digits" },
                                pattern: { value: /^[0-9]{6}$/, message: "OTP must be 6 numbers" }
                            })}
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                        />
                        {errors.otp && <p className="error-message">{errors.otp.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition"
                    >
                        Login to Seller Account
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-700">
                    New Seller?{" "}
                    <Link to="/SellerSignUp" className="text-blue-600 hover:underline">
                        Create Seller Account
                    </Link>
                </p>

            </div>

            <ToastContainer />
        </div>
    );
};

export default SellerLogin;
