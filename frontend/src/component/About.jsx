import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import HowItWorks from "./HowItWorks";
import { useTranslation } from "../context/LanguageContext";

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t("stat_experience") || "Years Experience", value: "12+" },
    { label: t("stat_deliveries") || "Daily Deliveries", value: "500+" },
    { label: t("stat_customers") || "Happy Customers", value: "10k+" },
    { label: t("stat_dishes") || "Menu Dishes", value: "45+" },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-20 select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Top Section: Story & Image */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-20">
          
          {/* Left Text Content */}
          <div className="flex-1 w-full text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#4B7318]"></span>
              <span className="text-[#4B7318] font-bold tracking-widest uppercase text-xs">
                {t("about_label") || "About Us"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight mb-6">
              {t("about_heading") || "We Serve Fresh &"}{" "}
              <span className="text-[#4B7318]">
                {t("about_heading_highlight") || "Delicious Food"}
              </span>
            </h2>

            <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              <p>
                {t("about_p1") ||
                  "Welcome to Yegna Byte, your ultimate destination for authentic flavors delivered straight to your doorstep. We are committed to bringing culinary excellence and fresh ingredients to every meal."}
              </p>
              <p>
                {t("about_p2") ||
                  "From traditional recipes to modern fast bites, our passion for good food ensures an extraordinary dining experience with speed, quality, and supreme customer care."}
              </p>
            </div>

            <div>
              <Link to="/menu">
                <button className="bg-[#4B7318] hover:bg-[#3d5e13] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-200 cursor-pointer active:scale-95 shadow-md">
                  {t("about_order_now") || "Order Now"}
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="flex-1 w-full relative">
            <div className="bg-[#EAEAEA] rounded-3xl p-4 sm:p-6 shadow-sm overflow-hidden">
              <img
                src={assets.deliveryman}
                alt="Delivery Service"
                className="w-full h-[380px] sm:h-[460px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-10 -left-4 bg-white px-6 py-4 rounded-xl shadow-xl border border-gray-100 hidden sm:block">
              <p className="text-2xl font-bold text-[#4B7318]">100%</p>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {t("about_natural") || "Fresh & Organic"}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-gray-200 mb-20 bg-[#F9F9F9] rounded-2xl px-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <HowItWorks />

      </div>
    </section>
  );
};

export default About;