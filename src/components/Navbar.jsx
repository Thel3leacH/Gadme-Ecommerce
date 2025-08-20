
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { BsBasket, BsPersonFill, BsSearch } from "react-icons/bs";
import Searchbar from "./Searchbar";
import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  //this will make change is react responsive
  const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = (event) => {
        event.preventDefault();
        setIsSearchVisible(!isSearchVisible);
    };
  
  
  
  return (
    <div>
      <header className="bg-[#48A6A7] text-shadow-cyan-50 text-amber-50 py-7">
        <nav className="md:flex justify-between items-center gap-12 px-6">
   <Link to="/">
                    <img src="/Gadme.png" alt="gadme-logo" width="30px" className="m-2" />
                </Link>
          <p className="md:text-5xl md:font-semibold md:uppercase md:text-center md:hover:text-amber-300">
            Gad-me
          </p>
          <AnimatedThemeToggler />
          <div className="md:flex gap-7 m-2">
            <p className="md:hover:text-amber-300">Home</p>
            <p className="md:hover:text-amber-300">Products</p>
            <p className="md:hover:text-amber-300">About</p>
            <p className="md:hover:text-amber-300">Contact</p>
          </div>
    
                    <ul className="flex flex-row flex-end gap-4 m-2">
                    <li>
                        <button onClick={toggleSearch} >
                            <BsSearch className="text-2xl " />
                        </button>
                    </li>

                    <li>
                        <Link to="/productlists">
                            <BsBasket className="text-2xl " />
                        </Link>
                    </li>

                    <li>
                        <a href="#">
                            <BsPersonFill className="text-2xl " />
                        </a>
                    </li>
                </ul>
            </nav>
            {isSearchVisible && <Searchbar />}
      </header>
    </div>
  );
};

export default Navbar;

