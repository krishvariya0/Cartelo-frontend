import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router";

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedUser");
    if (user) setLoggedUser(JSON.parse(user));
  }, []);

  // Generate initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <>
      {/* Top Banner
      <div className="w-full bg-black text-yellow-300 py-2 text-center text-sm">
        <button className="animate-bounceSmooth">Sign in to get extra 5% off</button>
      </div> */}

      {/* Navbar */}
      <nav className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold text-gray-700 hover:text-blue-600 transition cursor-pointer tracking-wide"
          >
            Cartelo
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-full px-5 py-2 pl-6 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-2xl hover:text-blue-600" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">

            {/* Profile Button */}
            {loggedUser ? (
              <Link
                to="/ProfilePage"
                className="w-10 h-10 bg-gray-700 text-white flex items-center justify-center rounded-full text-lg font-bold hover:bg-gray-900 transition"
              >
                {getInitials(loggedUser.name)}
              </Link>
            ) : (
              <Link to="/authModel" className="text-gray-700 hover:text-blue-600 transition">
                <CgProfile className="text-3xl" />
              </Link>
            )}

            {/* Cart */}
            <button className="text-gray-700 hover:text-blue-600 transition relative">
              <MdOutlineShoppingCart className="text-3xl" />
              <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
