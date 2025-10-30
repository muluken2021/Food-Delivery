import React, { useContext } from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const footerBg = theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-100";
  const mainText = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-700";
  const inputBg = theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400";

  return (
    <footer className={`${footerBg} mt-10 px-5 transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">DashDine</h3>
            <p className={`mb-6 leading-relaxed ${subText}`}>
              Your favorite food delivered fresh and fast. Order from the best restaurants in your area.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <button
                  key={idx}
                  className={`hover:text-yellow-500 hover:bg-gray-800/20 p-2 rounded-full transition ${mainText}`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-yellow-500">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Menu", path: "/menu" },
                { name: "Contact Us", path: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`hover:text-yellow-500 transition-colors ${subText}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-yellow-500">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span className={subText}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span className={subText}>info@bitedish.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className={subText}>123 Food Street, City</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h4 className="text-xl font-semibold mb-6 text-yellow-500">Stay Updated</h4>
            <p className={subText + " mb-4"}>
              Subscribe to get special offers and updates
            </p>
            <div className="space-y-3">
              <input 
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${inputBg}`}
              />
              <button className="w-full px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"} py-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${subText} text-sm`}>
              © 2024 DashDine. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, idx) => (
                <a key={idx} href="#" className={`hover:text-yellow-500 transition ${subText}`}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
