import { BsBasket, BsPersonFill, BsSearch } from "react-icons/bs";


export function Navbar() {
    return (
        <div className="bg-[#006A71]">
            <nav className="bg-[#006A71] flex flex-row justify-between">
                <img src="/Gadme.png" alt="gadme-logo" className="size-<4>" />
                <h1>GadMe</h1>
                <ul className="flex flex-row flex-end gap-2">
                    <li >
                        <a
                            href="#">
                            <BsSearch className="text-2xl " />
                        </a>
                    </li>

                    <li >
                        <a
                            href="#">
                            <BsBasket className="text-2xl " />
                        </a>
                    </li>

                    <li >
                        <a
                            href="#">
                            <BsPersonFill className="text-2xl " />
                        </a>
                    </li>
                </ul>
            </nav>
        </div >
    )
}