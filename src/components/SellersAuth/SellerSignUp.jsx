import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../../utils/";

function SellerSignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // CHECK IF MOBILE OR EMAIL ALREADY EXISTS IN FIRESTORE
            const sellerRef = collection(db, "sellers");

            const q = query(
                sellerRef,
                where("email", "==", data.email.toLowerCase())
            );

            const q2 = query(
                sellerRef,
                where("mobile", "==", data.mobile)
            );

            const emailSnap = await getDocs(q);
            const mobileSnap = await getDocs(q2);

            if (!emailSnap.empty) {
                toast.error("Email already exists!");
                return;
            }

            if (!mobileSnap.empty) {
                toast.error("Mobile number already exists!");
                return;
            }

            // CREATE FIREBASE AUTH USER (OTP used as temporary password)
            const userCred = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.OTP
            );

            // SAVE SELLER DATA TO FIRESTORE
            await setDoc(doc(db, "sellers", userCred.user.uid), {
                name: data.name,
                email: data.email.toLowerCase(),
                mobile: data.mobile,
                pan: data.PAN,
                gst: data.GST,
                otp: data.OTP,
                termsAccepted: data.terms,
                role: "seller",
                createdAt: Date.now()
            });

            toast.success("Seller account created successfully!");

            setTimeout(() => navigate("/SellerLogin"), 1500);

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">
            {/* LOGO */}
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            {/* CARD */}
            <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg p-8">

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Your Seller Account
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* NAME */}
                        <div>
                            <label className="text-gray-700 font-medium">Name</label>
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "At least 3 characters" },
                                    pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
                                })}
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                            />
                            {errors.name && <p className="error-message">{errors.name.message}</p>}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-gray-700 font-medium">Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email",
                                    },
                                })}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>

                        {/* MOBILE */}
                        <div>
                            <label className="text-gray-700 font-medium">Mobile</label>
                            <input
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    minLength: { value: 10, message: "Must be 10 digits" },
                                    maxLength: { value: 10, message: "Must be 10 digits" },
                                    pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
                                })}
                                type="text"
                                placeholder="Enter mobile number"
                                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                            />
                            {errors.mobile && <p className="error-message">{errors.mobile.message}</p>}
                        </div>

                        {/* PAN */}
                        <div>
                            <label className="text-gray-700 font-medium">PAN Number</label>
                            <input
                                {...register("PAN", {
                                    required: "PAN is required",
                                    minLength: { value: 10, message: "PAN must be 10 characters" },
                                    maxLength: { value: 10, message: "PAN must be 10 characters" },
                                })}
                                type="text"
                                placeholder="ENTER PAN NUMBER"
                                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 uppercase"
                            />
                            {errors.PAN && <p className="error-message">{errors.PAN.message}</p>}
                        </div>

                        {/* GST */}
                        <div>
                            <label className="text-gray-700 font-medium">GST Number</label>
                            <input
                                {...register("GST", {
                                    required: "GST is required",
                                    minLength: { value: 15, message: "Must be 15 characters" },
                                    maxLength: { value: 15, message: "Must be 15 characters" },
                                })}
                                type="text"
                                placeholder="ENTER GST NUMBER"
                                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 uppercase"
                            />
                            {errors.GST && <p className="error-message">{errors.GST.message}</p>}
                        </div>

                        {/* OTP */}
                        <div>
                            <label className="text-gray-700 font-medium">OTP</label>
                            <input
                                {...register("OTP", {
                                    required: "OTP is required",
                                    minLength: { value: 6, message: "OTP must be 6 digits" },
                                    maxLength: { value: 6, message: "OTP must be 6 digits" },
                                    pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" }
                                })}
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
                            />
                            {errors.OTP && <p className="error-message">{errors.OTP.message}</p>}
                        </div>

                    </div>

                    {/* TERMS */}
                    <div className="flex items-start gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="mt-1"
                            {...register("terms", { required: "You must accept the terms" })}
                        />
                        <p className="text-gray-600">
                            By continuing, you agree to Cartelo's{" "}
                            <Link to="/SellerTerms" className="text-blue-600">Terms of Use</Link>{" "}
                            and{" "}
                            <Link to="/SellerPrivacy" className="text-blue-600">Privacy Policy</Link>.
                        </p>
                    </div>
                    {errors.terms && <p className="error-message">{errors.terms.message}</p>}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-500 transition"
                    >
                        Create Your Seller Account
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-700">
                    Already have an account?{" "}
                    <Link to="/SellerLogin" className="text-blue-600 hover:underline">
                        Sign In To Seller Account
                    </Link>
                </p>

            </div>

            <ToastContainer />
        </div>
    );
}

export default SellerSignUp;
