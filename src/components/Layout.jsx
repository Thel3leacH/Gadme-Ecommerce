import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {/* className="overflow-auto p-4" */}
      <main class="overflow-auto md:container mx-auto px-7">
        <Outlet />
      </main>
      {/* className="flex-shrink-0" */}
      <footer className="md:bg-chart-2 text-gray-400 text-sm mt-16">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
