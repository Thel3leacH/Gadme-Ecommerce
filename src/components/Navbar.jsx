import { BsBasket, BsPersonFill, BsSearch } from "react-icons/bs";


export function Navbar() {
    return (
        <div className="bg-[#006A71]">
            <nav className="bg-[#006A71] flex flex-row justify-between">
                <img src="../images/Gadme-Logo.png" alt="gadme-logo" />
                <h1>GadMe</h1>
                <ul className="flex flex-row-reverse">
                    <li >
                        <a
                            href="#">
                            <BsSearch />
                        </a>
                    </li>

                    <li >
                        <a
                            href="#">
                            <BsBasket />
                        </a>
                    </li>

                    <li >
                        <a
                            href="#">
                            <BsPersonFill />
                        </a>
                    </li>
                </ul>
            </nav>
        </div >
    )
}