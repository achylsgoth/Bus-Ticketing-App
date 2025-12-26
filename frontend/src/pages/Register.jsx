import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/users/', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed.');
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full border p-2 rounded"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <select
                        className="w-full border p-2 rounded bg-white"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="user">Passenger</option>
                        <option value="company">Bus Company</option>
                    </select>
                    <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
