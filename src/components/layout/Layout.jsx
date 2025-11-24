import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbar";
import SecondaryNavbar from "./SecondaryNavbar";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeButton={false}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={true}
        draggable={true}
        style={{ zIndex: 999999 }}
      />
      <Navbar />
      <SecondaryNavbar />
      <main>
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;
