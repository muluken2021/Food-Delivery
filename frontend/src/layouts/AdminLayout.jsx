import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import AdminNavbar from "../component/AdminNavbar";

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      {/* 1. Sidebar - Fixed width on desktop */}
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* 2. Main Wrapper - Pushed to the right by sidebar width */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        
        {/* 3. Sticky Navbar */}
        <AdminNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* 4. Page Content Area */}
        <main className="p-4 sm:p-8 flex-1">
          {/* Subtle Page Header Logic (Optional but matches image) */}
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>

        {/* 5. Footer */}
        <footer className="px-8 py-6 text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-50 pt-6">
            <p> © 2025 Yegna byte. Built for the future of food.</p>

        </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;