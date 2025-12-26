import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/jwt/create/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate('/dashboard'); // Mock dashboard redirect
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed! Check credentials.');
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border p-2 rounded"
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
