import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const Navbar = () => {
  return (
    <div>
      <header className="bg-[#48A6A7] text-shadow-cyan-50 text-amber-50 py-7">
        <nav className="md:flex justify-between items-center gap-12 px-6">
          <p className="md:text-5xl md:font-semibold md:uppercase md:text-center md:hover:text-amber-300">
            Logo
          </p>
          <p className="md:text-5xl md:font-semibold md:uppercase md:text-center md:hover:text-amber-300">
            Gad-me
          </p>

          <div className="md:flex gap-7">
            <p className="md:hover:text-amber-300">Home</p>
            <p className="md:hover:text-amber-300">Products</p>
            <p className="md:hover:text-amber-300">About</p>
            <p className="md:hover:text-amber-300">Contact</p>
            <AnimatedThemeToggler />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
