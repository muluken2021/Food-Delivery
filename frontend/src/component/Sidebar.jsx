// components/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  List,
  Users,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

const Sidebar = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const token = localStorage.getItem("token");

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin/dashboard' },
    { name: 'Add Food', icon: <PlusCircle className="w-5 h-5" />, path: '/admin/add' },
    { name: 'List Items', icon: <List className="w-5 h-5" />, path: '/admin/list' },
    { name: 'Users', icon: <Users className="w-5 h-5" />, path: '/admin/users' },
    { name: 'Orders', icon: <ShoppingCart className="w-5 h-5" />, path: '/admin/orders' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col fixed top-20 left-0 h-screen w-64 p-6 bg-brand-50 border-r border-brand-200 text-gray-900 shadow-md transition-all duration-300 rounded-xl">
        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                  ${isActive
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'hover:bg-brand-100 hover:text-brand-600'
                  }`}
              >
                <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-brand-500'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 rounded-xl font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMenuOpen(false)}></div>
          <div className="relative z-50 w-64 p-6 h-full bg-brand-50 text-gray-900 shadow-lg rounded-xl">
            <div className="flex flex-col gap-3">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                      ${isActive
                        ? 'bg-brand-500 text-white shadow-md'
                        : 'hover:bg-brand-100 hover:text-brand-600'
                      }`}
                  >
                    <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-brand-500'}`}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 rounded-xl font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;