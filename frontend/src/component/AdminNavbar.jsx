import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";

const AdminNavbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 sticky top-0 z-50 shadow-md bg-white text-brand-700">
      
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer hover:text-brand-500 transition"
        onClick={() => navigate("/")}
      >
        DashDine | <span className="text-lg text-brand-500">Admin</span>
      </h1>

      {/* Desktop Buttons */}
      <div className="flex gap-4 items-center">
        
        {/* Notification */}
        <button className="relative p-2 rounded transition hover:bg-brand-100">
          <Bell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Auth Button */}
        {token ? (
          <button
            onClick={handleLogout}
            className="hidden sm:flex px-4 py-1.5 rounded font-semibold bg-brand-500 text-white hover:bg-brand-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/admin/login")}
            className="hidden sm:flex px-4 py-1.5 rounded font-semibold bg-brand-500 text-white hover:bg-brand-600 transition"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden p-2 rounded transition hover:bg-brand-100"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default AdminNavbar;