import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { db } from "../../utils/firebase";

function SellerAuth() {

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "activeseller")),
            (snapshot) => {
                let isLoggedIn = false;

                snapshot.forEach((doc) => {
                    const session = doc.data();
                    if (session.userType === "seller" && session.isActive === true) {
                        isLoggedIn = true;
                    }
                });

                if (isLoggedIn) {
                    navigate("/SellerDashbord", { replace: true });
                }
            },
            (error) => {
                console.error("Session check failed:", error);
            }
        );

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">

            <div className="flex items-center justify-center mb-6">
                <Link to="/" className="text-5xl font-bold text-gray-700 tracking-wide">
                    Cartelo Seller
                </Link>
            </div>

            <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-xl shadow-lg p-10">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                    Welcome to Cartelo Seller
                </h1>

                <p className="text-center text-gray-700 mb-4">Already have a seller account?</p>

                <Link
                    to="/SellerLogin"
                    className="block w-full bg-gray-700 text-white text-center py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition"
                >
                    Continue to Seller Login
                </Link>

                <div className="flex items-center my-6">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-4 text-gray-500">OR</span>
                    <hr className="flex-1 border-gray-300" />
                </div>

                <p className="text-center text-gray-700 mb-4">Create your Cartelo Seller account</p>

                <Link
                    to="/SellerSignUp"
                    className="block w-full bg-gray-700 text-white text-center py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition mb-8"
                >
                    Create Seller Account
                </Link>

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
