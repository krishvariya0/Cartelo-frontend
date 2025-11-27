import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "../../utils/auth";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await resetPassword(data.email);
            toast.success("Password reset link sent to your email!");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                toast.error("No account found with this email!");
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">

            {/* LOGO */}
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo
                </Link>
            </div>

            {/* CARD */}
            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Forgot Your Password?
                </h1>

                <p className="text-center text-gray-600 mb-6">
                    Enter your registered email and we will send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* EMAIL */}
                     <div>
                        <label for='email' className="text-gray-700 font-medium">Email</label>
                        <input
                            {
                            ...register("email",
                                {
                                    required: { value: true, message: "Email is required" },
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email or number" }
                                })
                            }
                            type="text"
                            id='email'
                            placeholder="Enter your email"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.email && <p className="error-message" >{errors.email.message}</p>}
                    </div>

                    {/* RESET BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold 
                        hover:bg-gray-600 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* BACK TO LOGIN */}
                <p className="text-center text-gray-700 mt-6">
                    Remember your password?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>

            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
