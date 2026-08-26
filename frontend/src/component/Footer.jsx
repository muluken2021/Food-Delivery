import React from "react";
import { Twitter, Linkedin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-white text-neutral-800 transition-all border-t border-gray-200 mt-20 select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Section */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Left Column: Brand Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-12">
            <div>
              <Link to="/" className="flex items-center gap-2 group mb-3">
                {/* Brand Logo Container */}
                <div className="w-9 h-9 bg-[#4B7318] rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-sm flex items-center justify-center text-white shadow-sm">
                  <span className="font-bold text-xl leading-none">Y</span>
                </div>
                <h1 className="text-neutral-900 text-xl font-bold tracking-tight">
                  Yegna Byte
                </h1>
              </Link>
              
              <p className="text-neutral-500 text-sm sm:text-base font-normal max-w-sm leading-relaxed mb-8">
                {t("footer_company_desc") || "Stunning and Flawless Cuisine Delivered to Your Doorstep."}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-neutral-600">
              <a
                href="#"
                className="hover:text-[#4B7318] transition-colors p-1"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-[#4B7318] transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="hover:text-[#4B7318] transition-colors p-1"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Right Columns: Links Group */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Pages Column */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-6">
                Pages
              </h4>
              <ul className="space-y-3.5">
                {[
                  { nameKey: "footer_home", defaultText: "Home", path: "/" },
                  { nameKey: "footer_menu", defaultText: "Menu", path: "/menu" },
                  { nameKey: "footer_pricing", defaultText: "Pricing", path: "/pricing" },
                  { nameKey: "footer_offers", defaultText: "Freebies", path: "/offers" },
                  { nameKey: "footer_track", defaultText: "Tracking", path: "/profile" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-500 hover:text-[#4B7318] transition-colors font-medium"
                    >
                      {t(link.nameKey) !== link.nameKey ? t(link.nameKey) : link.defaultText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-6">
                Company
              </h4>
              <ul className="space-y-3.5">
                {[
                  { nameKey: "footer_about", defaultText: "About", path: "/about" },
                  { nameKey: "footer_articles", defaultText: "Articles", path: "/blog" },
                  { nameKey: "footer_contact", defaultText: "Contact", path: "/contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-500 hover:text-[#4B7318] transition-colors font-medium"
                    >
                      {t(link.nameKey) !== link.nameKey ? t(link.nameKey) : link.defaultText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-6">
                Resources
              </h4>
              <ul className="space-y-3.5">
                {[
                  { nameKey: "footer_privacy", defaultText: "Privacy Policy", path: "/privacy" },
                  { nameKey: "footer_licensing", defaultText: "Licensing", path: "/licensing" },
                  { nameKey: "footer_terms", defaultText: "Terms of Use", path: "/terms" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-sm text-neutral-500 hover:text-[#4B7318] transition-colors font-medium"
                    >
                      {t(link.nameKey) !== link.nameKey ? t(link.nameKey) : link.defaultText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="border-t border-gray-200 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500 font-normal">
          <p>
            {t("footer_copyright") || "© Yegna Byte | All Rights Reserved"}
          </p>

          <div className="flex items-center gap-2 text-neutral-700 font-medium">
            <span className="w-5 h-5 rounded-md bg-[#4B7318] text-white flex items-center justify-center font-bold text-[10px]">
              Y
            </span>
            <span>Powered by Muluken K.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;