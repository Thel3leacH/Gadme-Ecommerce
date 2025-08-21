
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { BsBasket, BsPersonFill, BsSearch } from "react-icons/bs";
import Searchbar from "./Searchbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignupForm, SignupPopup } from "./SignupForm";


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
                            <button
                                onClick={toggleLoginAndSignup}
                                className="flex flex-row"
                            >
                                <BsPersonFill className="text-2xl " />
                            </button>
                        </li>
                    </ul>
                </nav>
                {isSearchVisible && <Searchbar />}
                {isLoginVisible && <LoginForm />}
                {isSignupVisible && <SignupForm />}

                <div className="bg-white flex flex-row w-auto sm:w-full gap-5">
                    <Link to="/">
                        <img src="/notebookpic.jpg" alt="gadme-logo" className="m-2 " />
                    </Link>
                    <Link to="/">
                        <img src="/notebookpic.jpg" alt="gadme-logo" className="m-2 " />
                    </Link>
                    <Link to="/">
                        <img src="/notebookpic.jpg" alt="gadme-logo" className="m-2 " />
                    </Link>
                    <Link to="/">
                        <img src="/notebookpic.jpg" alt="gadme-logo" className="m-2 " />
                    </Link>
                    <Link to="/">
                        <img src="/notebookpic.jpg" alt="gadme-logo" className="m-2" />
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default Navbar;

