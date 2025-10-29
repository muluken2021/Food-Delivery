import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  List,
  Users,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { ThemeContext2 } from '../context/ThemeContext2';

const Sidebar = ({ menuOpen, setMenuOpen }) => {
  const { isDark } = useContext(ThemeContext2);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

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
      <aside
          className={`
            hidden sm:flex flex-col fixed top-20 left-0 h-screen w-64 p-6
            ${isDark ? 'bg-gray-900 border-r border-gray-800 text-gray-300' : 'bg-white border-r border-gray-100 text-gray-900'}
            transition-all duration-300
          `}
        >
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                  ${isActive
                    ? 'bg-yellow-500 text-white shadow-md'
                    : isDark
                      ? 'hover:bg-gray-800 hover:text-yellow-400'
                      : 'hover:bg-yellow-50 hover:text-yellow-600'
                  }`}
              >
                <span
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-white' : isDark ? 'text-yellow-400' : 'text-yellow-500'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>

            );

          })}
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
        </div>
      </aside>

      {/* Mobile Sidebar (optional) */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-50 flex sm:hidden`}
        >
          <div
            className={`fixed inset-0 bg-black/30`}
            onClick={() => setMenuOpen(false)}
          ></div>
          <div
            className={`
              relative z-50 w-64 p-6 h-full
              ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900'}
            `}
          >
            <button
              className="absolute top-4 right-4 text-2xl font-bold"
              onClick={() => setMenuOpen(false)}
            >
              &times;
            </button>
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group
                      ${isActive
                        ? 'bg-yellow-500 text-white shadow-md'
                        : isDark
                          ? 'hover:bg-gray-800 hover:text-yellow-400'
                          : 'hover:bg-yellow-50 hover:text-yellow-600'
                      }`}
                  >
                    <span
                      className={`transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-white' : isDark ? 'text-yellow-400' : 'text-yellow-500'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className={`mt-30 px-3 py-1 rounded font-semibold transition ${
                  isDark
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
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
