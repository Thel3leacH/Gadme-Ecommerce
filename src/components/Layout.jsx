import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* <nav className="flex justify-between items-center p-4 bg-teal-500 text-white">
        <h2>gadme</h2>
        <input placeholder="Search here..." className="border" />
        <div className="flex items-center gap-4">
          <p>089-898-9999</p>
          <button>Cart</button>
          <button>Login</button>
        </div>
      </nav> */}
      <div className="p-6 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
