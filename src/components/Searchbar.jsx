import { useState } from "react";


export default function Searchbar() {
    const [query, setQuery] = useState('');
    //mock up items array, can remove later or bind with our items
    const items = [
        "iPhone 15",
        "Samsung Galaxy S24",
        "Xiaomi Mi 14",
        "MacBook Air",
        "iPad Pro",
        "Apple Watch",
        "Sony WH-1000XM5",
    ];

    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-[#006A71] border-t border-[#00565c]/30 px-3 py-3">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
                <label className="block">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search the item"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black outline-none focus:border-[#ffffff] bg-amber-50"
                    />
                </label>
            </form>

            {query.trim() && (
                <div className="mt-3 text-sm text-gray-700">
                    {filteredItems.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {filteredItems.map((item, index) => (
                                <li key={index}>{item}</li>
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
