import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router";

function AuthModel() {
    return (
        <div className="w-full flex justify-center mt-10 mb-24 px-4">
            {/* MAIN CARD */}
            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome to Cartelo</h1>

                {/* SIGN IN SECTION */}
                <div className="mt-8 text-center">
                    <p className="text-gray-700 mb-2 font-medium">Already have an account?</p>

                    <Link
                        to="/login"
                        className="w-full bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 rounded-md shadow-md border border-whitetransition inline-block"
                    >
                        Continue to Sign-In
                    </Link>
                </div>


                {/* DIVIDER */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* CREATE ACCOUNT */}
                <div className="text-center" >
                    <p className="text-gray-700 mb-2 font-medium">Create your Cartelo account</p>
                    <Link
                        to="/signUp"
                        className="w-full bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 rounded-md shadow-md border border-whitetransition inline-block"
                    >
                        Create Account
                    </Link>
                </div>

                {/* BENEFITS BOX */}
                <div className="mt-8 border border-gray-200 bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Cartelo Profile Benefits</h3>

                    <ul className="space-y-3 text-gray-700 text-[15px]">
                        <li className="flex items-center gap-2">
                            <span className="text-purple-600 text-lg"><AiFillCaretRight /></span>
                            View orders & track deliveries
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="text-purple-600 text-lg"><AiFillCaretRight /></span>
                            Manage account saved addresses
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="text-purple-600 text-lg"><AiFillCaretRight /></span>
                            Access your wishlist anytime
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="text-purple-600 text-lg"><AiFillCaretRight /></span>
                            Personalized product recommendations
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-purple-600 text-lg"><AiFillCaretRight /></span>
                            And many more future benefits <span className="text-purple-600 text-lg" >&</span> Extra dicounts
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default AuthModel;
