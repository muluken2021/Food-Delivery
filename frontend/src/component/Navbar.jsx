import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ login, setLogin, scrollToMenu }) => {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const { cartItems, clearCart } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [login]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (desktopProfileRef.current && !desktopProfileRef.current.contains(e.target)) &&
        (mobileProfileRef.current && !mobileProfileRef.current.contains(e.target))
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  // Active nav link
  useEffect(() => {
    switch (location.pathname) {
      case "/": setActive("home"); break;
      case "/menu": setActive("menu"); break;
      case "/orderpage": setActive("orders"); break;
      case "/contact": setActive("contactus"); break;
      case "/about": setActive("aboutus"); break;
      default: setActive(""); break;
    }
  }, [location.pathname]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    setUser(null);
    setProfileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", key: "home" },
    { name: "Menu", path: "/menu", key: "menu" },
    ...(user ? [{ name: "Orders", path: "/orderpage", key: "orders" }] : []),
    { name: "About Us", path: "/about", key: "aboutus" },
    { name: "Contact Us", path: "/contact", key: "contactus" },
    ...(user && user.role == 'admin' ? [{ name: "Dashboard", path: "/admin/dashboard", key: "admin", target: '' }] : []),
  ];

  const totalItemsInCart = Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  console.log(totalItemsInCart)

  return (
    <>
      <nav
        className={`px-5 xl:mx-20 lg:my-5 lg:rounded-full shadow-xl fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          isScrolled
            ? theme === "dark"
              ? "bg-[#0c0c0c]/95 shadow-lg"
              : "bg-white/95 shadow-lg"
            : theme === "dark"
            ? "bg-[#0c0c0c]/95"
            : "bg-white/95"
        }`}
      >
        <div className="max-w-full mx-auto lg:px-24 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <h1
              className={`text-2xl md:text-3xl font-extrabold hover:text-[#e58d00] transition ${
                theme === "dark" ? "text-white" : "text-gray-600"
              }`}
            >
              Dash<span className="text-[#e58d00]">Dine</span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <ul className={`hidden md:flex gap-8 font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {navLinks.map((link) => (
              <Link target={link.target} key={link.key} to={link.path}>
                <li
                  className={`relative pb-1 cursor-pointer transition duration-200 ${
                    active === link.key
                      ? "text-[#e58d00] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#e58d00]"
                      : "hover:text-[#e58d00]"
                  }`}
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 transition">
              {theme === "dark" ? <Sun size={20} color="#e58d00" /> : <Moon size={20} color="#e58d00" />}
            </button>

            {/* Cart */}
            <div className="relative">
              <Link to="/cart">
                <ShoppingCart size={24} className="transition duration-200 text-[#e58d00]" />
              </Link>
              {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalItemsInCart}
                </span>
              )}
            </div>

            {/* Desktop Profile / Logout */}
            {user && (
              <div className="hidden md:flex relative" ref={desktopProfileRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e58d00] text-white font-bold cursor-pointer hover:bg-[#ffb84d] transition"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-full mt-2 w-44 rounded-lg shadow-lg py-2 z-50 border transition-all duration-200 ${
                    profileOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  } ${theme === "dark" ? "bg-[#1a1a1a] border-gray-700" : "bg-white border-gray-300"}`}
                >
                  <button
                   onClick={handleLogout}
                   className={`cursor-pointer w-full text-left px-4 py-2 text-md text-red-500 transition 
                    ${theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-100"}`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
            {/* desktop Sign Up */}
            {!user && (
              <button
                onClick={() => setLogin(true)}
                className="hidden md:flex  text-white px-8 py-2 rounded-full transition w-full "
                style={{ backgroundColor: "#e58d00" }}
              >
                Sign Up
              </button>
            )}

            {user && (
              <div className="md:hidden flex relative" ref={mobileProfileRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e58d00] text-white font-bold cursor-pointer hover:bg-[#ffb84d] transition"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-full mt-2 w-44 rounded-lg shadow-lg py-2 z-50 border transition-all duration-200 ${
                    profileOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  } ${theme === "dark" ? "bg-[#1a1a1a] border-gray-700" : "bg-white border-gray-300"}`}
                >
                  <button
                   onClick={handleLogout}
                   className={`cursor-pointer w-full text-left px-4 py-2 text-md text-red-500 transition 
                    ${theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-100"}`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className={`md:hidden text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className={`md:hidden py-5 px-6 border-t shadow-md transition-all duration-300 ${
              theme === "dark" ? "bg-[#1a1a1a]" : "bg-white"
            }`}
          >
            <ul className={`flex flex-col gap-4 py-4 font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {navLinks.map((link) => (
                <Link key={link.key} to={link.path}>
                  <li onClick={() => setMenuOpen(false)} className={`cursor-pointer ${active === link.key ? "text-[#e58d00] font-semibold" : ""}`}>
                    {link.name}
                  </li>
                </Link>
              ))}
            </ul>

            {/* Mobile Sign Up */}
            {!user && (
              <button
                onClick={() => setLogin(true)}
                className="text-white px-8 py-2 rounded-full transition w-full mt-2"
                style={{ backgroundColor: "#e58d00" }}
              >
                Sign Up
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
