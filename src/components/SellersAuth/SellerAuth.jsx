import { Link } from "react-router";

function SellerAuth() {
    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">

            {/* LOGO */}
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            {/* CARD */}
            <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-lg p-10">

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Welcome to Cartelo Seller
                </h1>

                {/* Already have account */}
                <p className="text-center text-gray-700 mb-4">Already have a seller account?</p>

                <Link
                    to="/SellerLogin"
                    className="block w-full bg-gray-700 text-white text-center py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition"
                >
                    Continue to Seller Login
                </Link>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-4 text-gray-500">OR</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                {/* Create Account */}
                <p className="text-center text-gray-700 mb-4">Create your Cartelo Seller account</p>

                <Link
                    to="/SellerSignUp"
                    className="block w-full bg-gray-700 text-white text-center py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition mb-8"
                >
                    Create Seller Account
                </Link>

                {/* BENEFITS */}
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Your Cartelo Seller Benefits
                    </h2>

                    <ul className="space-y-3 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">▸</span>
                            Manage your product listings & inventory
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">▸</span>
                            Track your orders & fulfilment status
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">▸</span>
                            Secure seller dashboard with analytics
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">▸</span>
                            Real-time revenue insights & reports
                        </li>

                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">▸</span>
                            Priority seller support & help center
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default SellerAuth;
