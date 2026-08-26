import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useTranslation } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import { ShoppingCart, LogOut, Menu, X, LayoutDashboard, User2, ChevronRight, ChevronDown } from "lucide-react";
import UserDropdown from "./UserDropdown";

const Navbar = ({ login, setLogin }) => {
  const location = useLocation();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);

  const { language, switchLanguage, t } = useTranslation();
  const { currency, switchCurrency } = useCurrency();

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const currencyRef = useRef(null);
  const languageRef = useRef(null);

  const { cartItems, clearCart } = useContext(StoreContext);

  const currencies = ["ETB", "USD", "EUR"];
  const languages = [
    { code: "EN", label: "ENG" },
    { code: "AM", label: "አማርኛ" }
  ];

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
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: t('nav_home') || "Home", path: "/", key: "home" },
    { name: t('nav_menu') || "Menu", path: "/menu", key: "menu" },
    { name: t('nav_about') || "About", path: "/about", key: "aboutus" },
  ];

  const totalItemsInCart = Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-transparent ${isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2 group ">
          {/* Brand Logo Container */}
          <div className="w-9 h-9 bg-[#4B7318] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm flex items-center justify-center text-white shadow-sm">
            <span className="font-bold text-xl leading-none">Y</span>
          </div>
          <h1 className="text-neutral-900 text-xl font-bold tracking-tight">
            Yegna Byte
          </h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`relative text-sm font-medium transition-colors ${
                active === link.key ? "text-black font-semibold" : "text-gray-600 hover:text-black"
              }`}
            >
              {link.name}
              {active === link.key && (
                <span className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-black rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Controls Area */}
        <div className="flex items-center gap-4 lg:gap-6">

          {/* Currency Dropdown */}
          <div className="relative" ref={currencyRef}>
            <button 
              onClick={() => { setCurrencyOpen(!currencyOpen); setLanguageOpen(false); }}
              className="flex items-center gap-1 text-xs font-semibold text-gray-800 hover:text-black px-2 py-1 transition-colors cursor-pointer"
            >
              <span>$ {currency === "USD" ? "USA" : currency}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            {currencyOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl py-1 text-gray-800 border border-gray-100 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => { switchCurrency(curr); setCurrencyOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 cursor-pointer ${currency === curr ? "text-black font-bold bg-gray-100/70" : ""}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div className="relative" ref={languageRef}>
            <button 
              onClick={() => { setLanguageOpen(!languageOpen); setCurrencyOpen(false); }}
              className="flex items-center gap-1 text-xs font-semibold text-gray-800 hover:text-black px-2 py-1 transition-colors cursor-pointer"
            >
              <span>{language === "EN" ? "ENG" : language}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${languageOpen ? "rotate-180" : ""}`} />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl py-1 text-gray-800 border border-gray-100 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { switchLanguage(lang.code); setLanguageOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 cursor-pointer ${language === lang.code ? "text-black font-bold bg-gray-100/70" : ""}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Container */}
          <Link to="/cart" className="relative p-1.5 text-black hover:opacity-80 transition-opacity">
            <ShoppingCart size={22} strokeWidth={2} />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#5A8D36] text-white text-[10px] font-extrabold h-5 w-5 flex items-center justify-center rounded-full">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          {/* User Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 ml-2" ref={profileRef}>
            {user ? (
              <UserDropdown handleLogout={handleLogout}/>
            ) : (
              <>
                <button
                  onClick={() => setLogin(true)}
                  className="px-5 py-2.5 rounded-none bg-white text-[#5A8D36] font-semibold text-xs hover:bg-gray-50 transition-all cursor-pointer shadow-sm border border-gray-100"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setLogin(true)}
                  className="px-5 py-2.5 rounded-none bg-white text-[#5A8D36] font-semibold text-xs hover:bg-gray-50 transition-all cursor-pointer shadow-sm border border-gray-100"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <button 
            className="lg:hidden p-2 text-black hover:bg-gray-100/50 rounded-lg transition-colors cursor-pointer" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="p-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors ${active === link.key ? "bg-gray-100 text-black font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {link.name}
              <ChevronRight size={16} className={active === link.key ? "opacity-100" : "opacity-0"} />
            </Link>
          ))}

          {/* Mobile User Controls */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                <Link 
                  to="/profile" 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg text-sm"
                >
                  <User2 size={18} /> {t('nav_profile') || "Profile"}
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg text-sm"
                  >
                    <LayoutDashboard size={18} /> {t('nav_admin_dashboard') || "Dashboard"}
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-sm"
                >
                  <LogOut size={18} /> {t('nav_logout') || "Log Out"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setMenuOpen(false); setLogin(true); }}
                  className="w-full p-2.5 bg-white text-[#5A8D36] border border-gray-200 font-semibold rounded-none text-xs text-center cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setLogin(true); }}
                  className="w-full p-2.5 bg-white text-[#5A8D36] border border-gray-200 font-semibold rounded-none text-xs text-center cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;