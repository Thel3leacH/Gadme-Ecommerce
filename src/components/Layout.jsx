import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="overflow-auto p-4">
        <Outlet />
      </main>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
