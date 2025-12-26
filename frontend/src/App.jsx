import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddBus from './pages/AddBus';
import BookingPage from './pages/BookingPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-bus" element={<AddBus />} />
            <Route path="/book/:scheduleId" element={<BookingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
