import { useState } from "react";

export function Form() {
    const [person, setPerson] = useState({
        firstName: "Barbara",
        lastName: "Hepworth",
        email: "bhepworth@sculpture.com",
    });

    const handleChange = (field) => (e) => {
        setPerson({
            ...person,
            [field]: e.target.value,
        });
    };

    return (
        <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg border border-purple-700">
            <h2 className="text-2xl font-bold text-pink-500 mb-4 text-center">
                What is your name and email?
            </h2>

            <div className="space-y-4">
                <label className="block">
                    <span className="text-gray-400">First Name</span>
                    <input
                        type="text"
                        value={person.firstName}
                        onChange={handleChange("firstName")}
                        className="mt-1 block w-full p-2 bg-gray-800 border border-purple-600 rounded-lg placeholder-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-400">Last Name</span>
                    <input
                        type="text"
                        value={person.lastName}
                        onChange={handleChange("lastName")}
                        className="mt-1 block w-full p-2 bg-gray-800 border border-purple-600 rounded-lg placeholder-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </label>

                <label className="block">
                    <span className="text-gray-400">Email</span>
                    <input
                        type="email"
                        value={person.email}
                        onChange={handleChange("email")}
                        className="mt-1 block w-full p-2 bg-gray-800 border border-purple-600 rounded-lg placeholder-purple-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </label>
            </div>

            <p className="mt-6 text-center text-indigo-300">
                {person.firstName} {person.lastName} ({person.email})
            </p>
        </div>
    );
}
