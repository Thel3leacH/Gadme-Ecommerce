import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { BsBasket, BsPersonFill, BsSearch } from "react-icons/bs";

import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import Searchbar from "./Searchbar";

const Navbar = () => {
  //this will make change is react responsive
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = (event) => {
    event.preventDefault();
    setIsSearchVisible(!isSearchVisible);
  };

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  const toggleLoginAndSignup = (event) => {
    event.preventDefault();
    setIsLoginVisible(!isLoginVisible);
    setIsSignupVisible(!isSignupVisible);
  };

  return (
    <div>
      {/* style for header className="bg-[#48A6A7] shadow-md text-shadow-cyan-50 text-amber-50 py-7" */}
      <header className="bg-chart-2 md:bg-chart-2 py-2 text-white-400 text-xl">
        <nav className="flex md:flex justify-between items-center gap-12 px-6">
          <div className="md:flex gap-3.5">
            <Link to="/">
              <img
                src="/Gadme.png"
                alt="gadme-logo"
                width="30px"
                className="m-2"
              />
            </Link>
            <p className="md:text-4xl md:font-semibold md:uppercase md:hover:text-yellow-400">
              Gad-me
            </p>
          </div>
          <ul className="hidden md:flex gap-7 m-2">
            <li className="md:hover:text-amber-300">
              <Link to="/">Home</Link>
            </li>
            <li className="md:hover:text-amber-300">
              <Link to="/productlists">Products</Link>
            </li>
            <li className="md:hover:text-amber-300">About</li>
            <li className="md:hover:text-amber-300">Contact</li>
            <li>
              <Link to="/productlists">
                <BsBasket className="text-2xl " />
              </Link>
            </li>
            <li className="md:hover:text-amber-300">
              <button onClick={toggleLoginAndSignup}>
                <BsPersonFill className="text-2xl " />
              </button>
            </li>

            <li>
              <AnimatedThemeToggler />
            </li>
          </ul>

          <ul className="flex gap-4 m-2 md:hidden">
            <li>
              <button onClick={toggleSearch}>
                <BsSearch className="text-2xl " />
              </button>
            </li>

            <li>
              <Link to="/productlists">
                <BsBasket className="text-2xl " />
              </Link>
            </li>

            <li>
              <button onClick={toggleLoginAndSignup} className="flex flex-row">
                <BsPersonFill className="text-2xl " />
              </button>
            </li>

            <li>
              <AnimatedThemeToggler />
            </li>
          </ul>
        </nav>
        {isSearchVisible && <Searchbar />}
        {isLoginVisible && <LoginForm />}
        {isSignupVisible && <SignupForm />}

        {/* <div className="bg-white flex flex-row w-auto sm:w-full gap-5">
          <Link to="/">
            <img
              src="/notebookpic.jpg"
              alt="gadme-logo"
              className="rounded-xl shadow-md m-2 "
            />
          </Link>
          <Link to="/">
            <img
              src="/notebookpic.jpg"
              alt="gadme-logo"
              className="rounded-xl shadow-md m-2"
            />
          </Link>
          <Link to="/">
            <img
              src="/notebookpic.jpg"
              alt="gadme-logo"
              className="rounded-xl shadow-md m-2"
            />
          </Link>
          <Link to="/">
            <img
              src="/notebookpic.jpg"
              alt="gadme-logo"
              className="rounded-xl shadow-md m-2"
            />
          </Link>
          <Link to="/">
            <img
              src="/notebookpic.jpg"
              alt="gadme-logo"
              className="rounded-xl shadow-md m-2"
            />
          </Link>
        </div> */}
      </header>
    </div>
  );
};

export default Navbar;
