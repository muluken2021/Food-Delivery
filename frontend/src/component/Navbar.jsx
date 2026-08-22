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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 ${isScrolled ? "py-3 shadow-sm" : "py-4"}`}>
      
      <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between">

        {/* Logo Left */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* Custom SVG Logo Mark matching the reference image */}
          <div className="w-8 h-8 bg-neutral-900 rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm flex items-center justify-center text-white">
            <span className="font-bold text-lg leading-none">Y</span>
          </div>
          <h1 className="text-neutral-900 text-xl font-bold tracking-tight">Yegna Byte</h1>
        </Link>

        {/* Desktop Navigation Center */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`text-sm font-medium transition-colors ${active === link.key ? "text-neutral-900 font-semibold" : "text-neutral-600 hover:text-neutral-900"}`}
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
              className="flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-200 transition-colors cursor-pointer"
            >
              <DollarSign size={14} />
              <span>{currency}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
            </button>
            {currencyOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-lg py-1 text-neutral-800 border border-gray-100 z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => { switchCurrency(curr); setCurrencyOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-neutral-50 cursor-pointer ${currency === curr ? "text-neutral-900 font-bold bg-neutral-100/60" : ""}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP TOGGLES: Language Panel Dropdown */}
          <div className="hidden md:block relative" ref={languageRef}>
            <button 
              onClick={() => { setLanguageOpen(!languageOpen); setCurrencyOpen(false); }}
              className="flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-200 transition-colors cursor-pointer"
            >
              <Globe size={14} />
              <span>{language}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${languageOpen ? "rotate-180" : ""}`} />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg py-1 text-neutral-800 border border-gray-100 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { switchLanguage(lang.code); setLanguageOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-neutral-50 cursor-pointer ${language === lang.code ? "text-neutral-900 font-bold bg-neutral-100/60" : ""}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors">
            <ShoppingCart size={19} />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1 -right-1 bg-lime-400 text-neutral-900 text-[10px] font-extrabold h-4.5 w-4.5 flex items-center justify-center rounded-full border border-white">
                {totalItemsInCart}
              </span>
            )}
          </Link>

          {/* Vertical Separator */}
          <div className="hidden md:block h-5 w-[1px] bg-gray-200 mx-1"></div>
          
          {/* User Account Controls */}
          <div className="hidden md:flex items-center gap-2" ref={profileRef}>
            {user ? (
              <UserDropdown handleLogout={handleLogout}/>
            ) : (
              <>
                <button
                  onClick={() => setLogin(true)}
                  className="px-4 py-2 rounded-lg text-neutral-900 border border-gray-200 font-semibold text-xs hover:bg-neutral-50 transition-all cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  onClick={() => setLogin(true)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
                >
                  {t('nav_get_started')}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon Toggle Button */}
          <button 
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer text-neutral-800" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel Area */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="p-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-base font-medium transition-colors ${active === link.key ? "bg-neutral-100 text-neutral-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"}`}
            >
              {link.name}
              <ChevronRight size={18} className={active === link.key ? "opacity-100" : "opacity-0"} />
            </Link>
          ))}

          {/* MOBILE TOGGLES Selection Layer */}
          <div className="grid grid-cols-2 gap-4 py-3 px-2 mt-2 border-t border-b border-gray-100">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">{t('nav_language')}</label>
              <select 
                value={language} 
                onChange={(e) => switchLanguage(e.target.value)}
                className="w-full bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-lg p-2.5 border border-gray-200 focus:outline-none"
              >
                {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">{t('nav_currency')}</label>
              <select 
                value={currency} 
                onChange={(e) => switchCurrency(e.target.value)}
                className="w-full bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-lg p-2.5 border border-gray-200 focus:outline-none"
              >
                {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
              </select>
            </div>
          </div>

          {/* User Account Drawer Base Block */}
          <div className="mt-2 pt-2">
            {user ? (
              <div className="space-y-1">
                <p className="px-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Account</p>
                <Link 
                  to="/profile" 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-3 text-neutral-700 font-medium hover:bg-neutral-50 rounded-xl text-sm"
                >
                  <User2 size={18} /> {t('nav_profile')}
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 p-3 text-neutral-700 font-medium hover:bg-neutral-50 rounded-xl text-sm"
                  >
                    <LayoutDashboard size={18} /> {t('nav_admin_dashboard')}
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  <LogOut size={18} /> {t('nav_logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setLogin(true);
                  }}
                  className="w-full p-3 bg-neutral-900 text-white font-semibold rounded-xl text-sm transition-all text-center cursor-pointer"
                >
                  {t('nav_get_started')}
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setLogin(true);
                  }}
                  className="w-full p-3 bg-white text-neutral-900 border border-gray-200 font-semibold rounded-xl text-sm transition-all text-center cursor-pointer"
                >
                  Sign in
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