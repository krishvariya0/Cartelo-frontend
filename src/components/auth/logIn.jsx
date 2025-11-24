import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

function LogIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({}); // <-- for error messages like signup

    const validateForm = () => {
        let temp = {};

        if (!email) temp.email = "Email is required";
        if (!password) temp.password = "Password is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // local validation first
        if (!validateForm()) {
            toast.error("Please fix the errors");
            return;
        }

        const usersJson = localStorage.getItem("carteloUser");
        const users = usersJson ? JSON.parse(usersJson) : [];

        const found = users.find(
            (user) =>
                user.email.toLowerCase() === email.toLowerCase() &&
                user.password === password
        );

        if (!found) {
            toast.error("Invalid email or password");
            return;
        }

        // Save current user
        localStorage.setItem(
            "loggedUser",
            JSON.stringify({ email: found.email, name: found.name })
        );

        toast.success("Login successful!");

        setTimeout(() => {
            navigate("/");
        }, 1000);
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

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: "" });
                            }}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                            focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>

                    {/* REMEMBER */}
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4"
                            />
                            Remember me
                        </label>
                        <Link className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-3 rounded-md text-sm font-semibold 
                        hover:bg-gray-600 transition"
                    >
                        Login
                    </button>
                </form>

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
