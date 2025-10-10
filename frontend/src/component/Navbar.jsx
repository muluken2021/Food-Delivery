import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const Navbar = ({ login, setLogin, scrollToMenu }) => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);
  const { cartItems, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [login]);

  // Add scroll background effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearCart();
    setUser(null);
    setProfileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", key: "home" },
    { name: "Menu", path: null, key: "menu", onClick: scrollToMenu },
    { name: "Orders", path: "/orderpage", key: "orders" },
    { name: "Contact Us", path: "/contact", key: "contactus" },
  ];

  const totalItemsInCart = Object.values(cartItems).reduce(
    (total, qty) => total + qty,
    0
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-lg bg-[#0B1726] shadow-md"
            : "bg-[#0B1726]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <h1 className="flex items-center text-2xl sm:text-3xl font-extrabold text-yellow-400 hover:text-yellow-500 transition duration-300">
              {/* <span className="mr-2">
                <img src="./logo.png" alt="BiteDash Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              </span> */}
              BiteDash
            </h1>
          </Link>


          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-8 text-white font-medium">
            {navLinks.map((link) =>
              link.path ? (
                <Link key={link.key} to={link.path}>
                  <li
                    onClick={() => setActive(link.key)}
                    className={`relative pb-1 transition duration-200 cursor-pointer ${
                      active === link.key
                        ? "text-yellow-400 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-yellow-400"
                        : "hover:text-yellow-300"
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              ) : (
                <li
                  key={link.key}
                  onClick={() => {
                    setActive(link.key);
                    link.onClick?.();
                  }}
                  className={`relative pb-1 transition duration-200 cursor-pointer ${
                    active === link.key
                      ? "text-yellow-400 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-yellow-400"
                      : "hover:text-yellow-300"
                  }`}
                >
                  {link.name}
                </li>
              )
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <div className="relative">
              <Link to="/cart">
                <img
                  src={assets.cart_icon}
                  alt="Cart"
                  className="h-7 hover:scale-110 transition duration-200"
                />
              </Link>
              {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalItemsInCart}
                </span>
              )}
            </div>

            {/* Profile / Sign Up */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-[#0B1726] font-bold cursor-pointer hover:bg-yellow-500 transition duration-300"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-gray-700 text-sm border-b">
                      {user.name}
                    </p>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLogin(true)}
                className="px-5 py-2 bg-yellow-400 text-[#0B1726] rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Sign Up
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-white text-2xl font-bold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden bg-[#0B1726] border-t shadow-md transition-all duration-300">
            <ul className="flex flex-col gap-4 px-6 py-4 text-white font-medium">
              {navLinks.map((link) =>
                link.path ? (
                  <Link key={link.key} to={link.path}>
                    <li
                      onClick={() => {
                        setActive(link.key);
                        setMenuOpen(false);
                      }}
                      className={`cursor-pointer ${
                        active === link.key ? "text-yellow-400 font-semibold" : ""
                      }`}
                    >
                      {link.name}
                    </li>
                  </Link>
                ) : (
                  <li
                    key={link.key}
                    onClick={() => {
                      setActive(link.key);
                      setMenuOpen(false);
                      link.onClick?.();
                    }}
                    className={`cursor-pointer ${
                      active === link.key ? "text-yellow-400 font-semibold" : ""
                    }`}
                  >
                    {link.name}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
