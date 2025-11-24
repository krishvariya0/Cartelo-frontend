import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

function SellerSignUp() {
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

        const userData = localStorage.getItem(" SellerCarteloUser");

        console.log("userData", userData, typeof userData);
        if (userData) {
            const oldUserData = JSON.parse(userData);
            console.log("oldUserData", oldUserData);
            const findEmail = oldUserData.find(user => user.email?.toLowerCase() === data.email?.toLowerCase());
            console.log("findEmail>>>", findEmail);
            if (findEmail) {
                console.log("findEmail", findEmail);
                toast.error("This email already exists!");
                return;
            }
            const newUserData = [...oldUserData, data];
            console.log("newUserData", newUserData)
            localStorage.setItem(" SellerCarteloUser", JSON.stringify(newUserData));
        } else {
            const newUserData = [data];
            console.log("newUserData", newUserData);
            localStorage.setItem(" SellerCarteloUser", JSON.stringify(newUserData));
        }

        toast.success("Account created successfully!");
        navigate("/login");
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
            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* NAME */}
                    <div>
                        <label className="text-gray-700 font-medium">Name</label>
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
                            placeholder="Enter your name"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.name && <p className="error-message" >{errors.name.message}</p>}
                    </div>

                    {/* EMAIL OR NUMBER */}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            {
                            ...register("email",
                                {
                                    required: { value: true, message: "Email is required" },
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email or number" }
                                })
                            }
                            type="text"
                            placeholder="Enter your email"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.email && <p className="error-message" >{errors.email.message}</p>}
                    </div>
                    {/* GST NUMBER */}
                    <div>
                        <label className="text-gray-700 font-medium">GST</label>
                        <input
                            {
                            ...register("GST",
                                {
                                    required: { value: true, message: "GST Number is required" },
                                    maxLength: { value: 24, message: "Invalid GST number" },
                                    minLength: { value: 24, message: "Invalid GST number" }
                                })
                            }
                            type="text"
                            placeholder="Enter your GST Number"
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.GST && <p className="error-message" >{errors.GST.message}</p>}
                    </div>



                    {/* TERMS */}
                    <div className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1"
                            {...register("terms", { required: { value: true, message: "You must agree to the terms and conditions" } })} />
                        <p className="text-gray-600">
                            By continuing, you agree to Cartelo's{" "}
                            <span className="text-blue-600 cursor-pointer"><Link to="/SellerTerms">Terms of Use</Link></span> and{" "}
                            <span className="text-blue-600 cursor-pointer"> <Link to="/SellerPrivacy">  Privacy Policy </Link> </span>.

                            {errors.terms && <p className="error-message" >{errors.terms.message}</p>}
                        </p>
                    </div>
                    {/* SIGN UP BUTTON */}
                    <button type='submit'
                        // to="/"
                        className=" bg-gray-700 text-white py-3 rounded-md text-sm font-semibold 
                       hover:bg-gray-500 transition inline-block w-full text-center"
                    >
                        Create Your Seller Account
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center mt-6 text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Sign In To Seller Account
                    </Link>
                </p>

            </div>
            <ToastContainer />
        </div>

    );
}

export default SellerSignUp;

