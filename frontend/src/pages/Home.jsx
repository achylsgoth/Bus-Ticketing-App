import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [search, setSearch] = useState({ origin: '', destination: '', date: '' });

    const handleSearch = (e) => {
        e.preventDefault();
        // Redirect to search results (mock)
        console.log('Searching', search);
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-indigo-700">Find Your Bus</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Origin"
                        className="border p-3 rounded"
                        value={search.origin}
                        onChange={(e) => setSearch({ ...search, origin: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Destination"
                        className="border p-3 rounded"
                        value={search.destination}
                        onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                    />
                    <input
                        type="date"
                        className="border p-3 rounded"
                        value={search.date}
                        onChange={(e) => setSearch({ ...search, date: e.target.value })}
                    />
                    <button type="submit" className="bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 font-bold">
                        Search Bus
                    </button>
                </form>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                        <div className="h-40 bg-gray-200 mb-4 rounded"></div>
                        <h3 className="text-xl font-bold">Popular Route {i}</h3>
                        <p className="text-gray-600">Explore the city with comfort.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
