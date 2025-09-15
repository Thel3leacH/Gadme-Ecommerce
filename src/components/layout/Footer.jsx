import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-chart-2 md:bg-gradient-to-r from-chart-3 to-chart-2 text-secondary p-6 flex justify-between gap-16 shadow-lg">
      <div className="mx-2 my-2 flex flex-col justify-between gap-2">
        <img src="/Gadme.png" alt="gadme-logo" width="30px" />
        <h1>GadMe</h1>
        <p>Customer Supports:</p>
        <p>(629) 555-0129</p>
        <p>4517 Washington Ave. </p>
        <p>Manchester, Kentucky 39495</p>
        <p>info@gadme.com</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-bold">Top Category</h2>
        <ul className="flex flex-col space-y-2">
          <li>
            <a href="#" className="hover:underline">
              Computer & Laptop
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              SmartPhone
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Headphone
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Accessories
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Camera & Photo
            </a>
          </li>
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="font-bold">Quick Links</h2>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link to="about" className="hover:underline">
              About us
            </Link>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Contact Us
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Privacy Policy
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Terms & Conditions
            </a>
          </li>

          <li>
            <a href="#" className="hover:underline hover:text-amber-200">
              Camera & Photo
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
