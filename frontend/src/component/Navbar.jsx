import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ShoppingCart, User, LogOut, Menu, X, LayoutDashboard, User2 } from "lucide-react";
import UserDropdown from "./UserDropdown";

const Navbar = ({ login, setLogin }) => {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
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
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    setProfileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", key: "home" },
    { name: "Our Menu", path: "/menu", key: "menu" },
    { name: "About Us", path: "/about", key: "aboutus" },
  ];

  const totalItemsInCart = Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white py-3 shadow-md" : "bg-transparent py-6"}  backdrop-blur-md`}>
      
      <div className="container mx-auto px-6 lg:px-24 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-semibold tracking-tight">
            <span className="text-brand-500">Dash Dine</span>

          </span>
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
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={22} className="text-gray-700" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItemsInCart}
              </span>
            )}
          </Link>
          
          {/* User / Sign In */}
          <div className="relative" ref={profileRef}>
            {user ? (
               <UserDropdown handleLogout={handleLogout}/>
            ) : (
              <button
                onClick={() => setLogin(true)}
                className="hidden md:block px-8 py-2 rounded-full border-2 border-brand-500 text-brand-500 font-bold text-sm hover:bg-brand-500 hover:text-white transition-all duration-300"
              >
                Get Started
              </button>
            )}

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-4 w-48 rounded-2xl shadow-xl border p-2 bg-white border-gray-100">
                {user?.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm hover:bg-brand-50 text-gray-700"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                )}
                 <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm hover:bg-brand-50 text-gray-700"
                  >
                    <User2 size={16} /> Profile
                  </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="text-gray-900" /> : <Menu className="text-gray-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full p-6 space-y-4 shadow-xl border-t bg-brand-50 border-brand-100">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-lg font-medium ${active === link.key ? "text-brand-500" : "text-gray-600 hover:text-brand-500"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;