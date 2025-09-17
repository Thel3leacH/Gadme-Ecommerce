import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="font-poppins">
      {/* <header className="fixed w-full"> */}
      <Navbar />
      {/* </header> */}
      <main className="md:container mx-auto">
        <Outlet />
      </main>
      <footer className="mt-auto w-full bg-chart-2 md:bg-gradient-to-r from-chart-3 to-chart-2 text-secondary shadow-lg">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
