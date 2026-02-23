import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Menu, X, Search, MessageSquare, Gift, Settings } from "lucide-react";
import UserDropdown from "./UserDropdown"; // Ensure path is correct

const AdminNavbar = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-50">
      
      {/* Left Section: Mobile Toggle & Search */}
      <div className="flex items-center gap-6 flex-1">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Search Bar - Matches Davur Design */}
        <div className="hidden md:flex items-center relative w-full max-w-md group">
          <Search className="absolute left-4 text-gray-300 group-focus-within:text-brand-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search here"
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Right Section: Utilities & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Desktop Utility Icons */}
        <div className="hidden sm:flex items-center gap-1 border-r border-gray-100 pr-4 mr-2">
          <UtilityButton icon={<MessageSquare size={20} />} badge="5" color="text-blue-500" bg="bg-blue-50" />
          <UtilityButton icon={<Bell size={20} />} badge="12" color="text-brand-500" bg="bg-brand-50" />
          <UtilityButton icon={<Gift size={20} />} badge="2" color="text-purple-500" bg="bg-purple-50" />
          <UtilityButton icon={<Settings size={20} />} badge="!" color="text-orange-500" bg="bg-orange-50" />
        </div>

        {/* User Profile Section */}
        {token ? (
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden xl:block text-right">
              <p className="text-sm font-bold text-gray-800 leading-none">Hello, Samuel</p>
            </div>
            <UserDropdown handleLogout={handleLogout} />
          </div>
        ) : (
          <button
            onClick={() => navigate("/admin/login")}
            className="px-6 py-2.5 rounded-xl font-bold bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-100 transition active:scale-95"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

/* Helper Component for the colorful utility buttons in the image */
const UtilityButton = ({ icon, badge, color, bg }) => (
  <button className={`relative p-2.5 rounded-xl transition-all hover:scale-110 active:scale-90 ${bg} ${color}`}>
    {icon}
    {badge && (
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white border-2 border-white">
        {badge}
      </span>
    )}
  </button>
);

export default AdminNavbar;