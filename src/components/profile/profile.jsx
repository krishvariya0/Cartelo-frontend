import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    FiHeart, FiLock, FiMapPin, FiShoppingBag, FiUser
} from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";
import { Link, useNavigate } from "react-router";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate("/authModel");
                return;
            }
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    if (!user) return null;

   const getInitials = (user) => {
    if (!user) return "";

    const name = user.displayName || user.email || "";
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
};

    const initials = getInitials(user);

    return (
        <div className="max-w-5xl mx-auto mt-16 px-4 pb-24">

            <h1 className="text-3xl font-bold mb-10">Your Cartelo Account</h1>

            {/* USER CARD */}
            <div className="bg-white p-6 rounded-lg border shadow-md flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {initials}
                </div>

                <div>
                    <h2 className="text-xl font-semibold">{user.displayName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            {/* Options */}
            <h2 className="text-xl font-semibold mt-10 mb-4">
                Manage your account
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProfileCard icon={<FiShoppingBag className="text-4xl text-blue-600" />} title="Your Orders" />
                <ProfileCard icon={<FiMapPin className="text-4xl text-green-600" />} title="Your Addresses" />
                <ProfileCard icon={<FiLock className="text-4xl text-purple-600" />} title="Login & Security" />
                <ProfileCard icon={<FiHeart className="text-4xl text-pink-600" />} title="Your Wishlist" />

                <Link to="/EditProfile">
                    <ProfileCard icon={<FiUser className="text-4xl text-indigo-600" />} title="Your Profile" />
                </Link>

                <Link to="/SellerAuth">
                    <ProfileCard icon={<MdSupervisorAccount className="text-4xl text-indigo-600" />} title="Your Seller Account" />
                </Link>
            </div>

            <button
                onClick={() => {
                    const auth = getAuth();
                    auth.signOut();
                    navigate("/");
                }}
                className="w-full mt-12 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600"
            >
                Log Out
            </button>
        </div>
    );
}

export default ProfilePage;

function ProfileCard({ icon, title }) {
    return (
        <div className="bg-white border shadow-md p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl transition cursor-pointer">
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
    );
}
