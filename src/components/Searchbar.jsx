import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Api = "https://68996ee5fed141b96b9f7a90.mockapi.io/gameak/products";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  //fetch info from API
  useEffect(() => {
    axios
      .get(Api)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredItems = items.filter((item) =>
    item.productName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-[#006A71] border-t border-[#00565c]/30 px-3 py-3">
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <label className="block">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the item"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black outline-none focus:border-[#ffffff] bg-amber-50"
          />
        </label>
      </form>

      {query.trim() && (
        <div className="mt-3 text-sm text-gray-700">
          {filteredItems.length > 0 ? (
            <ul className="list-disc list-inside bg-teal-700 p-1">
              {filteredItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/product/${item.id}`}
                    className="hover:underline text-blue-200"
                  >
                    {item.productName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="opacity-70">Not Found relate item</div>
          )}
        </div>
      )}
    </div>
  );
}
