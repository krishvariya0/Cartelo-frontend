import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";



const Navbar = () => {
  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-black text-yellow-300 py-2 text-center text-sm">
        <button className=" animate-bounceSmooth" >Sign in to get extra 5% off</button>
      </div>


      {/* Navbar */}
      <nav className="w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="text-3xl font-extrabold text-gray-700 cursor-pointer tracking-wide">
            {/* <img src={'/src/assets/logo.jpg'} alt="logo" className="h-12" /> */}
            Cartelo
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-full px-5 py-2 pl-6 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button>
              <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl hover:text-blue-600 transition" />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button className="text-gray-700 hover:text-blue-600 transition">
              <CgProfile className="text-3xl" />
            </button>

            <button className="text-gray-700 hover:text-blue-600 transition relative">
              <MdOutlineShoppingCart className="text-3xl" />
            </button>
          </div>
        </div>
    
      </nav>

    </>
  );
};

export default Navbar;
