import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ShoppingCart, LogOut, Menu, X, LayoutDashboard, User2, ChevronRight } from "lucide-react";
import UserDropdown from "./UserDropdown";

const Navbar = ({ login, setLogin }) => {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);

  const { cartItems, clearCart } = useContext(StoreContext);

  // Authentication & Scroll Logic
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [login]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActive("home");
    else if (path.includes("menu")) setActive("menu");
    else if (path.includes("about")) setActive("aboutus");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    setUser(null);
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", key: "home" },
    { name: "Our Menu", path: "/menu", key: "menu" },
    { name: "About Us", path: "/about", key: "aboutus" },
  ];

  const totalItemsInCart = Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 py-3 shadow-sm" : "bg-transparent py-6"} backdrop-blur-md`}>
      
      <div className="container mx-auto px-6 lg:px-24 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
           <img src="/full_logo.png" className="w-25 md:w-30" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`text-sm font-semibold transition-all duration-300 ${active === link.key ? "text-brand-500" : "text-gray-600 hover:text-brand-500"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart size={22} className="text-gray-700" />
            {totalItemsInCart > 0 && (
              <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItemsInCart}
              </span>
            )}
          </Link>
          
          {/* User Desktop */}
          <div className="hidden md:block" ref={profileRef}>
            {user ? (
               <UserDropdown handleLogout={handleLogout}/>
            ) : (
              <button
                onClick={() => setLogin(true)}
                className="px-8 py-2.5 rounded-full bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 shadow-lg shadow-brand-500/20 transition-all duration-300"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} className="text-gray-900" /> : <Menu size={28} className="text-gray-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="p-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between p-4 rounded-xl text-lg font-semibold transition-colors ${active === link.key ? "bg-brand-25 text-brand-500" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {link.name}
              <ChevronRight size={18} className={active === link.key ? "opacity-100" : "opacity-0"} />
            </Link>
          ))}

          {/* User Section in Mobile Menu */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</p>
                <Link 
                  to="/profile" 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-4 text-gray-700 font-medium hover:bg-gray-50 rounded-xl"
                >
                  <User2 size={20} /> Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-4 text-gray-700 font-medium hover:bg-gray-50 rounded-xl"
                  >
                    <LayoutDashboard size={20} /> Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            ) : (
              /* Mobile Get Started Button */
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setLogin(true);
                }}
                className="w-full mt-2 p-4 bg-brand-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all text-center"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;