import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 px-5">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Bitedish</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your favorite food delivered fresh and fast. Order from the best restaurants in your area.
            </p>
            <div className="flex gap-4">
              <button className="text-gray-100 hover:text-yellow-500 hover:bg-gray-800/20 p-2 rounded-full transition">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-gray-100 hover:text-yellow-500 hover:bg-gray-800/20 p-2 rounded-full transition">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="text-gray-100 hover:text-yellow-500 hover:bg-gray-800/20 p-2 rounded-full transition">
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-yellow-500">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Restaurants</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Become a Partner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Delivery Areas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">Help & Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-yellow-500">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-400">info@bitedish.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-400">123 Food Street, City</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-yellow-500">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="space-y-3">
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="w-full px-4 py-2 bg-yellow-500 text-gray-100 font-semibold rounded-lg hover:bg-yellow-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Bitedish. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-yellow-500 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
