import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/users/me/');
                setUser(res.data);
                fetchData(res.data.role);
            } catch (error) {
                console.error('Fetch user failed', error);
            }
        };
        fetchUser();
    }, []);

    const fetchData = async (role) => {
        try {
            if (role === 'company') {
                const res = await api.get('/api/buses/'); // Should filter by owner in backend
                setData(res.data);
            } else {
                const res = await api.get('/api/bookings/');
                setData(res.data);
            }
        } catch (error) {
            console.error('Fetch data failed', error);
        }
    };

    if (!user) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-xl">Welcome, <span className="font-bold text-indigo-600">{user.username}</span></h2>
                <p className="text-gray-600">Role: {user.role}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">
                        {user.role === 'company' ? 'My Buses' : 'My Bookings'}
                    </h3>
                    {user.role === 'company' && (
                        <Link to="/add-bus" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add New Bus</Link>
                    )}
                </div>
                {data.length === 0 ? (
                    <p>No records found.</p>
                ) : (
                    <ul>
                        {data.map(item => (
                            <li key={item.id} className="border-b py-2">
                                {user.role === 'company'
                                    ? `${item.name} (${item.license_plate}) - ${item.bus_type}`
                                    : `Trip id: ${item.id} - Status: ${item.status}`
                                }
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
