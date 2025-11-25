import { useEffect, useState } from "react";

import {
    FiHeart,
    FiLock,
    FiMapPin,
    FiShoppingBag,
    FiUser,
} from "react-icons/fi";
import { MdSupervisorAccount } from "react-icons/md";
import { Link, useNavigate } from "react-router";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const logged = localStorage.getItem("loggedUser");

        if (!logged) {
            navigate("/authModel");
            return;
        }

        setUser(JSON.parse(logged));
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto mt-16 px-4 pb-24">

            {/* HEADER */}
            <h1 className="text-3xl font-bold text-gray-800 mb-10">
                Your Cartelo Account
            </h1>

            {/* USER CARD */}
            <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 mb-12 flex items-center gap-6">

                <div className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {user.name
                        ?.split(" ")
                        .map((word) => word.charAt(0).toUpperCase())
                        .slice(0, 2)
                        .join("")}
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>

                </div>
            </div>

            {/* SECTION TITLE */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Manage your account
            </h2>

            {/* GRID CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <ProfileCard
                    icon={<FiShoppingBag className="text-4xl text-blue-600" />}
                    title="Your Orders"
                    desc="Track, return, or reorder items"
                />

                <ProfileCard
                    icon={<FiMapPin className="text-4xl text-green-600" />}
                    title="Your Addresses"
                    desc="Manage your saved delivery locations"
                />

                <ProfileCard
                    icon={<FiLock className="text-4xl text-purple-600" />}
                    title="Login & Security"
                    desc="Edit login details & passwords"
                />

                <ProfileCard
                    icon={<FiHeart className="text-4xl text-pink-600" />}
                    title="Your Wishlist"
                    desc="View & manage saved items"
                />

                <Link to="/EditProfile">
                    <ProfileCard
                        icon={<FiUser className="text-4xl text-indigo-600" />}
                        title="Your Profile"
                        desc="Edit personal information"
                    />
                </Link>
                <Link to="/SellerAuth">
                    <ProfileCard
                        icon={<MdSupervisorAccount className="text-4xl text-indigo-600" />}
                        title="Your Seller Account"
                        desc="Edit seller account information"
                    />
                </Link>
            </div>

            {/* LOGOUT BUTTON */}
            <button
                onClick={() => {
                    localStorage.removeItem("loggedUser");
                    window.location.href = "/";
                }}
                className="w-full mt-12 bg-gray-700 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
            >
                Log Out
            </button>
        </div >
    );
}

export default ProfilePage;

/* Reusable Card Component */
function ProfileCard({ icon, title, desc }) {
    return (
        <div className="
            bg-white 
            border border-gray-300 
            shadow-md 
            rounded-lg 
            p-6 
            cursor-pointer 
            hover:shadow-xl 
            transition-all 
            hover:-translate-y-1
        ">
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{desc}</p>
        </div>
    );
}
