import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPass } from "../../utils/auth";

function LogIn() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(true), 3000);

        try {
            const response = await signInWithEmailAndPass(email, password);
            console.log("Login Response:", response);

            toast.success("Login Successful!");

            setTimeout(() => navigate("/"), 2000);

        } catch (error) {
            console.log("Login Error:", error);

            if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
                toast.error("Invalid email or password!");
            } else if (error.code === "auth/user-not-found") {
                toast.error("Account does not exist!");
            } else {
                toast.error("Something went wrong!");
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
                    Sign In
                </h1>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label for='email' className="text-gray-700 font-medium">Email</label>
                        <input
                            {...register("email", {
                                required: { value: true, message: "Email is required" },
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email or number" }
                            })
                            }
                            type="text"
                            id='email'
                            placeholder="Enter your email"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.email && <p className="error-message" >{errors.email.message}</p>}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label for="password" className="text-gray-700 font-medium">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters required" },
                                maxLength: { value: 20, message: "Max 20 characters allowed" }
                            })
                            }
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password.message}</p>
                        )}
                    </div>

                    {/* REMEMBER ME + FORGOT PASSWORD */}
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" className="w-4 h-4" />
                            Remember me
                        </label>

                        <Link to="/ForgotPassword" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button 
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition"
                        disabled={isDisabled}
                    >
                        Login
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center mt-6 text-gray-700">
                    New to Cartelo?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Create your account
                    </Link>
                </p>
            </div>

            <ToastContainer />
        </div>
    );
}

export default LogIn;

