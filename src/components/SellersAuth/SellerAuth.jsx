import { Link } from 'react-router';

function SellerAuth() {
    return (
        <div className="w-full flex flex-col items-center mt-15 mb-24 px-4">
            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-lg p-10">
                {/* <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Join Cartelo as a Seller
                </h1> */}
                <p className="text-center text-gray-700 mb-8">
                    Start selling your products and reach thousands of customers
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Login Option */}
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                I already have an account
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Sign in to your existing seller account and start selling
                            </p>
                        </div>
                        <Link
                            to="/SellerLogin"
                            className="block w-full bg-gray-700 text-white text-center py-3 rounded-md font-semibold hover:bg-gray-600 transition"
                        >
                            Sign In to Seller Account
                        </Link>
                    </div>

                    {/* Signup Option */}
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                I'm new to selling
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Create a new seller account and start selling
                            </p>
                        </div>
                        <Link
                            to="/SellerSignUp"
                            className="block w-full bg-green-600 text-white text-center py-3 rounded-md font-semibold hover:bg-green-700 transition"
                        >
                            Create Seller Account
                        </Link>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                        Why sell on Cartelo?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>Reach thousands of customers nationwide</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>Easy product listing and management</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>Secure payment processing</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">✓</span>
                            <span>Seller analytics and insights</span>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <Link to="/profile" className="text-gray-500 hover:text-gray-700 text-sm">
                        ← Back to User Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SellerAuth;
