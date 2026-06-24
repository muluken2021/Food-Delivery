import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useTranslation } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import { ShoppingCart, LogOut, Menu, X, LayoutDashboard, User2, ChevronRight, Globe, DollarSign, ChevronDown } from "lucide-react";
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

  // States for Currency and Language dropdown panels
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  // Bounding box refs for detecting outside clicks
  const currencyRef = useRef(null);
  const languageRef = useRef(null);

  const { cartItems, clearCart } = useContext(StoreContext);

  const currencies = ["ETB", "USD", "EUR"];
  const languages = [
    { code: "EN", label: "English" },
    { code: "AM", label: "አማርኛ" }
  ];

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

  // Closes open dropdowns when clicking anywhere outside of them
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
    { name: t('nav_home'), path: "/", key: "home" },
    { name: t('nav_menu'), path: "/menu", key: "menu" },
    { name: t('nav_about'), path: "/about", key: "aboutus" },
  ];

  const totalItemsInCart = Object.values(cartItems).reduce((total, qty) => total + qty, 0);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-brand-500 py-4 shadow-sm" : "bg-brand-500 py-6 border-b-1 border-brand-500 "} backdrop-blur-md`}>
      
      <div className="container mx-auto px-6 lg:px-24 flex items-center justify-between">

        {/* Logo Left */}
        <Link to="/" className="flex items-center gap-1 group">
           <h1 className="text-white text-2xl font-medium">Yegna Byte</h1>
        </Link>

        {/* Desktop Navigation Center */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`text-sm font-semibold transition-all duration-300 ${active === link.key ? "text-white" : "text-gray-100 hover:text-white"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Tray Right */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* DESKTOP TOGGLES: Currency Panel Dropdown */}
          <div className="hidden md:block relative" ref={currencyRef}>
            <button 
              onClick={() => { setCurrencyOpen(!currencyOpen); setLanguageOpen(false); }}
              className="flex items-center gap-1 text-sm font-semibold text-gray-100 hover:text-white px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <DollarSign size={16} />
              <span>{currency}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            {currencyOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-xl py-1 text-gray-800 border border-gray-100 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => { switchCurrency(curr); setCurrencyOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer ${currency === curr ? "text-brand-500 bg-brand-25" : ""}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP TOGGLES: Language Panel Dropdown */}
          <div className="hidden md:block relative mr-1" ref={languageRef}>
            <button 
              onClick={() => { setLanguageOpen(!languageOpen); setCurrencyOpen(false); }}
              className="flex items-center gap-1 text-sm font-semibold text-gray-100 hover:text-white px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <Globe size={16} />
              <span>{language}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${languageOpen ? "rotate-180" : ""}`} />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl py-1 text-gray-800 border border-gray-100 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { switchLanguage(lang.code); setLanguageOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer ${language === lang.code ? "text-brand-500 bg-brand-25" : ""}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 bg-gray-100 rounded-full transition-colors">
            <ShoppingCart size={22} className="text-gray-900" />
            {totalItemsInCart > 0 && (
              <span className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {totalItemsInCart}
              </span>
            )}
          </Link>
          
          {/* User Account Controls */}
          <div className="hidden md:block" ref={profileRef}>
            {user ? (
               <UserDropdown handleLogout={handleLogout}/>
            ) : (
              <button
                onClick={() => setLogin(true)}
                className="px-8 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 shadow-lg shadow-brand-500/20 transition-all duration-300 cursor-pointer"
              >
                {t('nav_get_started')}
              </button>
            )}
          </div>

          {/* Mobile Menu Icon Toggle Button */}
          <button 
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel Area */}
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

          {/* MOBILE TOGGLES Selection Layer */}
          <div className="grid grid-cols-2 gap-4 py-2 px-2 mt-2 border-t border-b border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('nav_language')}</label>
              <select 
                value={language} 
                onChange={(e) => switchLanguage(e.target.value)}
                className="w-full bg-gray-50 text-gray-800 text-sm font-semibold rounded-xl p-3 border border-gray-100 focus:outline-none"
              >
                {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('nav_currency')}</label>
              <select 
                value={currency} 
                onChange={(e) => switchCurrency(e.target.value)}
                className="w-full bg-gray-50 text-gray-800 text-sm font-semibold rounded-xl p-3 border border-gray-100 focus:outline-none"
              >
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
          </div>

          {/* User Account Drawer Base Block */}
          <div className="mt-2 pt-2">
            {user ? (
              <div className="space-y-2">
                <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Account</p>
                <Link 
                  to="/profile" 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-4 text-gray-700 font-medium hover:bg-gray-50 rounded-xl"
                >
                  <User2 size={20} /> {t('nav_profile')}
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-4 text-gray-700 font-medium hover:bg-gray-50 rounded-xl"
                  >
                    <LayoutDashboard size={20} /> {t('nav_admin_dashboard')}
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut size={20} /> {t('nav_logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setLogin(true);
                }}
                className="w-full mt-2 p-4 bg-brand-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all text-center cursor-pointer"
              >
                {t('nav_get_started')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;