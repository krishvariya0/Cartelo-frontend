import { get, ref } from "firebase/database";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { rtdb } from "../../utils/firebase";

const SellerLogin = () => {
    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [GST, setGST] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let temp = {};

        if (!mobile) temp.mobile = "Mobile number is required";
        else if (mobile.length !== 10)
            temp.mobile = "Mobile number must be 10 digits";

        if (!GST) temp.GST = "GST Number is required";
        else if (GST.length !== 15)
            temp.GST = "GST Number must be 15 characters";

        if (!otp) temp.otp = "OTP is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors");
            return;
        }

        try {
            const sellersRef = ref(rtdb, "sellers");
            const snapshot = await get(sellersRef);
            if (!snapshot.exists()) {
                toast.error("No sellers found");
                return;
            }
            const sellersData = snapshot.val();
            const sellers = Object.values(sellersData);
            const found = sellers.find(
                (seller) => seller.mobile === mobile && seller.GST === GST
            );
            if (!found) {
                toast.error("Mobile Number or GST Number is incorrect");
                return;
            }
            // Save logged seller
            localStorage.setItem(
                "loggedSeller",
                JSON.stringify({
                    name: found.name,
                    mobile: found.mobile,
                    GST: found.GST,
                    otp,
                })
            );
            toast.success("Seller Login Successful!");
            setTimeout(() => {
                navigate("/SellerDashbord");
            }, 1000);
        } catch (error) {
            toast.error("Login failed");
            console.error(error);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Seller Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* MOBILE FIELD */}
                    <div>
                        <label className="text-gray-700 font-medium">Mobile Number</label>
                        <input
                            type="text"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value);
                                setErrors({ ...errors, mobile: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.mobile && (
                            <p className="error-message">{errors.mobile}</p>
                        )}
                    </div>

                    {/* GST FIELD */}
                    <div>
                        <label className="text-gray-700 font-medium">GST Number</label>
                        <input
                            type="text"
                            placeholder="Enter your GST Number"
                            value={GST}
                            onChange={(e) => {
                                setGST(e.target.value);
                                setErrors({ ...errors, GST: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.GST && <p className="error-message">{errors.GST}</p>}
                    </div>

                    {/* OTP FIELD */}
                    <div>
                        <label className="text-gray-700 font-medium">OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setErrors({ ...errors, otp: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.otp && <p className="error-message">{errors.otp}</p>}
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition"
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

















const SellerLogin = () => {
    const navigate = useNavigate();

    const [mobile, setMobile] = useState("");
    const [GST, setGST] = useState("");
    const [otp, setOtp] = useState("");

    const [errors, setErrors] = useState({}); // <-- error messages same like user login

    // Validation just like user Login page
    const validateForm = () => {
        let temp = {};

        if (!mobile) temp.mobile = "Mobile number is required";
        else if (mobile.length !== 10)
            temp.mobile = "Mobile number must be 10 digits";

        if (!GST) temp.GST = "GST Number is required";
        else if (GST.length !== 15)
            temp.GST = "GST Number must be 15 characters";

        if (!otp) temp.otp = "OTP is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors");
            return;
        }

        const stored = localStorage.getItem("SellerCarteloUser");
        const sellers = stored ? JSON.parse(stored) : [];

        const found = sellers.find(
            (seller) => seller.mobile === mobile && seller.GST === GST
        );

        if (!found) {
            toast.error("Mobile Number or GST Number is incorrect");
            return;
        }

        // Save logged seller
        localStorage.setItem(
            "loggedSeller",
            JSON.stringify({
                name: found.name,
                mobile: found.mobile,
                GST: found.GST,
            })
        );

        toast.success("Seller Login Successful!");

        setTimeout(() => {
            navigate("/SellerDashbord");
        }, 1000);
    };

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Seller Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* MOBILE FIELD */}
                    <div>
                        <label className="text-gray-700 font-medium">Mobile Number</label>
                        <input
                            type="text"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => {
                                setMobile(e.target.value);
                                setErrors({ ...errors, mobile: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.mobile && (
                            <p className="error-message">{errors.mobile}</p>
                        )}
                    </div>

                    {/* GST FIELD */}
                    <div>
                        <label className="text-gray-700 font-medium">GST Number</label>
                        <input
                            type="text"
                            placeholder="Enter your GST Number"
                            value={GST}
                            onChange={(e) => {
                                setGST(e.target.value);
                                setErrors({ ...errors, GST: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.GST && <p className="error-message">{errors.GST}</p>}
                    </div>

                    {/* OTP FIELD */}
                    <div>
                        <label className="text-gray-700 font-medium">OTP</label>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setErrors({ ...errors, otp: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.otp && <p className="error-message">{errors.otp}</p>}
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition"
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
