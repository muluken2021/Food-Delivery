import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  List,
  Users,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  UtensilsCrossed
} from 'lucide-react';

const Sidebar = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders', badge: 25 },
    { name: 'Menus', icon: <UtensilsCrossed size={20} />, path: '/admin/list', hasSubmenu: true },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/users', hasSubmenu: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const SidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Logo - Top Section */}
      <div className="p-8 mb-6 border-b border-gray-200">
         <Link to="/" className="flex items-center gap-2 group">
            <img src="/full_logo.png" className="w-25 md:w-30" alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              onClick={isMobile ? () => setMenuOpen(false) : undefined}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-brand-25 text-brand-500 font-semibold' 
                  : 'text-gray-400 hover:text-brand-500 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center gap-4">
                <span className={`${isActive ? 'text-brand-500' : 'group-hover:text-brand-500'}`}>
                  {item.icon}
                </span>
                <span className="text-[15px]">{item.name}</span>
              </div>
              
              {item.badge && (
                <span className="bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded-md">
                  {item.badge}
                </span>
              )}
              {item.hasSubmenu && (
                <ChevronRight size={14} className={isActive ? 'text-brand-500' : 'text-gray-300'} />
              )}
            </Link>
          );
        })}
      </nav>

      

      {/* Logout Section */}
      <div className="px-6 pb-8 border-t border-gray-50 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors px-4 py-2 w-full text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 z-40 transition-all duration-300">
        {SidebarContent(false)}
      </aside>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
          <div className="relative z-50 w-72 h-full shadow-2xl animate-in slide-in-from-left duration-300">
            {SidebarContent(true)}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;