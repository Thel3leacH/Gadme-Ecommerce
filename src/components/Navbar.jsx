import { BsBasket, BsPersonFill, BsSearch } from "react-icons/bs";
import Searchbar from "./Searchbar";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = (event) => {
        event.preventDefault();
        setIsSearchVisible(!isSearchVisible);
    };

    return (
        <div className="bg-[#006A71]">
            <nav className="bg-[#006A71] flex flex-row justify-between">
                <Link to="/">
                    <img src="/Gadme.png" alt="gadme-logo" width="30px" className="m-2" />
                </Link>
                <h1 className="m-2">GadMe</h1>
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
        </div>
    );
}
