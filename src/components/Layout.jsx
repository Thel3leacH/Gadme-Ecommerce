import Navbar from "./landingpage/Navbar";
import Footer from "./landingpage/Footer";
import { Outlet } from "react-router-dom";
import Hero from "./LandingPage/Hero";

const Layout = () => {
  return (
    <div className="font-poppins">
      <header className="fixed w-full">
        <Navbar />
      </header>
      <main class="overflow-auto md:container mx-auto">
        <Outlet />
      </main>
      <footer className="md:bg-chart-2 text-gray-400 text-sm">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
