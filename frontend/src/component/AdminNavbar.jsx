import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // check if admin is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#0B1726] text-yellow-400 sticky top-0 z-50">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        BiteDash | <span className="text-lg">Admin</span>
      </h1>

      

      {/* Buttons for both desktop and mobile */}
      <div className="flex gap-4 items-center">
        {token ? (
          <>
           
            {/* Logout button visible everywhere */}
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
          >
            Login
          </button>
        )}
      </div>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden text-2xl"
      >
        ☰
      </button>
    </div>
  );
};

export default AdminNavbar;
