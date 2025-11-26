import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { signUpWithEmailAndPassword } from '../../utils/auth';

function SignUp() {


    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const passwordValue = watch("password");

    const onSubmit = (data) => {
        console.log("data", data);

        signUpWithEmailAndPassword(data.email, data.password).then((response) => {
            console.log("response", response);

            toast.success("Account created successfully!");
            

        }).catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                toast.error("User already exists!");
            }
        }).finally(() => {});



        



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

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* NAME */}
                    <div>
                        <label for='name' className="text-gray-700 font-medium">Name</label>
                        <input
                            {
                            ...register("name",
                                {
                                    required: { value: true, message: "Name is required" },
                                    minLength: { value: 3, message: "Name must be at least 3 characters long" },
                                    maxLength: { value: 20, message: "Name must be at most 20 characters long" },
                                    pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters and spaces" }
                                })
                            }
                            type="text"
                            id='name'
                            placeholder="Enter your name"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.name && <p className="error-message" >{errors.name.message}</p>}
                    </div>

                    {/* EMAIL OR NUMBER */}
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

                    {/* PASSWORD */}
                    <div>
                        <label for='password' className="text-gray-700 font-medium">Password</label>
                        <input
                            {
                            ...register("password",
                                {
                                    required: { value: true, message: "Password is required" },
                                    minLength: { value: 8, message: "Password must be at least 6 characters long" },
                                    maxLength: { value: 20, message: "Password must be at most 20 characters long" }
                                })
                            }
                            type="password"
                            id='password'
                            placeholder="Enter your password"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.password && <p className="error-message" >{errors.password.message}</p>}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                        <label for='confirmPassword' className="text-gray-700 font-medium">Confirm Password</label>
                        <input
                            {
                            ...register("confirmPassword",
                                {
                                    required: { value: true, message: "Password is required" },
                                    validate: (value) => value === passwordValue || "Passwords do not match"

                                })
                            }
                            type="password"
                            id='confirmPassword'
                            placeholder="Re-enter your password"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.confirmPassword && <p className="error-message" >{errors.confirmPassword.message}</p>}
                    </div>

                    {/* TERMS */}
                    <div className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1"
                            {...register("terms", { required: { value: true, message: "You must agree to the terms and conditions" } })} />
                        <p className="text-gray-600">
                            By continuing, you agree to Cartelo's{" "}
                            <span className="text-blue-600 cursor-pointer"><Link to="/termsofuse">Terms of Use</Link></span> and{" "}
                            <span className="text-blue-600 cursor-pointer"> <Link to="/privacypolicy">  Privacy Policy </Link> </span>.

                            {errors.terms && <p className="error-message" >{errors.terms.message}</p>}
                        </p>
                    </div>
                    {/* SIGN UP BUTTON */}
                    <button type='submit'
                        // to="/"
                        className=" bg-gray-700 text-white py-3 rounded-md text-sm font-semibold 
                       hover:bg-gray-500 transition inline-block w-full text-center"
                    >
                        Sign Up
                    </button>
                </form>

                {/* FOOTER */}
                <div className="flex flex-col items-center justify-center mt-6 mb-6">

                    <p className="text-center text-gray-700">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Sign In
                        </Link>
                    </p>

                    <div className="flex items-center justify-center mt-6">
                        <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-white shadow-md">
                            <FcGoogle size={24} className="mr-2" />
                            Continue with Google
                        </button>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>

    );
}

export default SignUp;

