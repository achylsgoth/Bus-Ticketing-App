import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">BusTicketApp</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-indigo-600">Home</Link>
                    {token ? (
                        <>
                            <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
                            <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-indigo-600">Login</Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
