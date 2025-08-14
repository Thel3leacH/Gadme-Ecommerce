export function Footer() {
  return (
    <div className="bg-[#006A71]">
      <div className="mx-2 my-2">
        <img src="../images/Gadme-Logo.png" alt="gadme-logo" />
        <h1>GadMe</h1>
        <text>Customer Supports:</text>
        <text>(629) 555-0129</text>
        <text>4517 Washington Ave. </text>
        <text>Manchester, Kentucky 39495</text>
        <text>info@gadme.com</text>
      </div>

      <div className="">
        <h2>Top Category</h2>
        <ul className="flex flex-row">
          <li>
            <a href="#">Computer & Laptop</a>
          </li>

          <li>
            <a href="#">SmartPhone</a>
          </li>

          <li>
            <a href="#">Headphone</a>
          </li>

          <li>
            <a href="#">Accessories</a>
          </li>

          <li>
            <a href="#">Camera & Photo</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
