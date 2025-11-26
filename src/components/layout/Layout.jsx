import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar";
import SecondaryNavbar from "./SecondaryNavbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeButton={false}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={true}
        draggable={true}
        style={{ zIndex: 999999 }}
      />
      <Navbar />
      <SecondaryNavbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;
