import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-poppins">
      {/* <header className="fixed w-full"> */}
      <Navbar />
      {/* </header> */}
      <main class="md:container mx-auto">
        <Outlet />
      </main>
      <footer className="md:bg-chart-2 text-gray-400 text-sm">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
