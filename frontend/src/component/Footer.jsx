import React, { useState, useEffect } from "react"; // Added useEffect
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false); // Track validation error

  // Clear error status when user types
  useEffect(() => {
    if (error) setError(false);
  }, [email]);

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError(true); // Show visual error instead of toast
      return;
    }

    // If valid, proceed with success
    toast.success("Subscribed successfully 🎉");
    setEmail("");
    setError(false);
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-white transition-all">
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-30"></div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Main Footer Content */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
               <img src="/full_logo.png" className="w-25 md:w-30" alt="Logo" />
            </Link>

            <p className="leading-relaxed text-sm md:text-base text-gray-600">
              Bringing the world's best flavors to your doorstep. Hot, fresh, and delivered with a smile. Your meal is just a dash away.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2.5 rounded-xl bg-white text-gray-500 shadow-sm hover:bg-brand-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-gray-700">Service</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Menu", path: "/menu" },
                { name: "Track Order", path: "/profile" },
                { name: "Contact Us", path: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-gray-600 hover:text-gray-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 text-gray-700">Get in Touch</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-gray-500">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-medium text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-gray-500">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium text-gray-600">hello@dashdine.com</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-500/10 text-gray-500">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  123 Gourmet Way,<br />Foodie City, FC 90210
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="p-6 rounded-3xl border bg-white border-gray-100">
            <h4 className="text-lg font-bold mb-4 text-gray-700">Stay Hungry</h4>
            <p className="text-xs mb-6 leading-relaxed text-gray-600">
              Subscribe for exclusive discounts and new menu alerts.
            </p>

            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`w-full pl-4 pr-12 py-3.5 rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 
                  ${error 
                    ? "border-red-500 bg-red-50 focus:ring-red-200" 
                    : "bg-brand-25 text-gray-700 border-brand-100 focus:ring-brand-500"
                  }`}
              />

              <div
                onClick={handleSubscribe}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-500 hover:bg-brand-600 text-white rounded-xl flex items-center justify-center cursor-pointer transition-colors"
              >
                <Send size={16} className="-rotate-45" />
              </div>
            </div>
            {/* Inline validation message */}
            {error && (
              <p className="text-[10px] text-red-500 mt-2 ml-2 animate-pulse">
                Please enter a valid email address
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium tracking-wide text-gray-400">
            © 2024 Yegna byte. Built for the future of food.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Cookies"].map((link, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-500 transition"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;