import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Bell, Menu, X } from "lucide-react";
import { ThemeContext2 } from "../context/ThemeContext2";

const AdminNavbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { isDark, toggleTheme } = useContext(ThemeContext2);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      className={`flex justify-between items-center px-6 py-4 sticky top-0 z-50 shadow-md transition-colors ${
        isDark ? "bg-gray-900 text-yellow-400" : "bg-white text-gray-900"
      }`}
    >
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate("/")}
      >
        BiteDash | <span className="text-lg">Admin</span>
      </h1>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex gap-4 items-center">
        <button
          className={`relative p-2 rounded transition ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded transition ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {token ? (
          <button
            onClick={handleLogout}
            className={`px-3 py-1 rounded font-semibold transition ${
              isDark
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/admin/login")}
            className={`px-3 py-1 rounded font-semibold transition ${
              isDark
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`sm:hidden p-2 rounded transition ${
          isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
        }`}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default AdminNavbar;
