

export function Navbar() {
    return (
        //nav bar
        <nav id="nav-container" className="bg-[#006A71]" >
            <div className="flex" id="logo-side" >
                <img src="#" alt="gadme-logo" />
                <h1>GadMe</h1>
            </div>

            <div className="justify-end text-2xl text-blue-50 ">
                <ul class="nav__list">
                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link">
                            <i class="bi bi-search"></i>
                        </a>
                    </li>

                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link">
                            <i class="bi bi-cart"></i>
                        </a>
                    </li>

                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link">
                            <i class="bi bi-person"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav >
    )
}