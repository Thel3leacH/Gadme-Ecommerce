import Navbar from "../components/landingpage/Navbar";
import Footer from "../components/landingpage/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <header>
        <Navbar />
      </header>
      <main className="overflow-auto p-4">
        <Outlet />
      </main>
      <footer className="md:bg-chart-2 text-gray-400 text-sm">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
