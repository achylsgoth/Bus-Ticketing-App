import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddBus = () => {
    const [formData, setFormData] = useState({
        name: '',
        license_plate: '',
        bus_type: 'AC',
        capacity: 30
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/buses/', formData);
            alert('Bus added successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to add bus', error);
            alert('Error adding bus.');
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="bg-white p-8 rounded shadow w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Add New Bus</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Bus Name"
                        className="w-full border p-2 rounded"
                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="License Plate"
                        className="w-full border p-2 rounded"
                        value={formData.license_plate} onChange={e => setFormData({ ...formData, license_plate: e.target.value })}
                    />
                    <select
                        className="w-full border p-2 rounded bg-white"
                        value={formData.bus_type} onChange={e => setFormData({ ...formData, bus_type: e.target.value })}
                    >
                        <option value="AC">AC</option>
                        <option value="NON_AC">Non-AC</option>
                        <option value="LUXURY">Luxury</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Capacity"
                        className="w-full border p-2 rounded"
                        value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                    />
                    <button className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Add Bus</button>
                </form>
            </div>
        </div>
    );
};

export default AddBus;
