import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, MapPin, Search, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useTranslation } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";

const Header = () => {
  const { t } = useTranslation();
  // Array of items with rich data for a modern experience
  const sliderImages = [
    { id: 0, img: assets.herofood2, title: "Spicy Peri-Peri Chicken", price: "$14.99", rating: "4.9", orders: "850" },
    { id: 1, img: assets.foodhero, title: "Premium Wagyu Burger", price: "$18.50", rating: "5.0", orders: "1.2k" },
    { id: 2, img: assets.foodhero3, title: "Fresh Salmon Poke Bowl", price: "$16.00", rating: "4.8", orders: "940" },
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Default to middle card
  const [searchLocation, setSearchLocation] = useState("");

  // Automatic slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // 5 seconds gives users more time to read data card details
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section className="relative w-full min-h-[550px] flex items-center bg-brand-500 overflow-hidden pt-24 pb-16 lg:py-0">
      
      {/* Aesthetic Background Accents */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Content Area */}
        <div className="flex-1 text-center lg:text-left z-10 space-y-8">

          {/* Main Hero Hook */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-100 leading-[1.15]">
              {t('hero_title')}<br />
               <span className="bg-gradient-to-r text-gray-300">{t('hero_subtitle')}</span>
            </h1>
            <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t('hero_description')}
            </p>
          </div>

          {/* Interactive Modern Search/Action Bar */}
          {/* <div className="max-w-md mx-auto lg:mx-0 bg-white p-2 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 pl-3 w-full">
              <MapPin className="text-brand-500 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Enter your delivery address..." 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400 py-2"
              />
            </div>
            <Link to="/menu" className="w-full sm:w-auto shrink-0">
              <button className="w-full bg-gray-900 hover:bg-brand-500 text-white text-sm font-bold py-3.5 px-6 rounded-xl sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md shadow-gray-900/10 hover:shadow-brand-500/20">
                Find Food
                <Search size={16} className="group-hover:scale-110 transition-transform" />
              </button>
            </Link>
          </div> */}

          
          
          {/* Action Button */}
            <div className="z-10 mt-6 md:m text-center">
              <Link to="/menu">
                <button className="flex gap-4 bg-white hover:bg-white/90 text-black font-medium text-lg py-3.5 px-10 rounded-full shadow-md transition-all active:scale-95 duration-300 cursor-pointer">
                  {t('hero_shop_now')}
                  <ArrowRight size={25} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
        </div>

        {/* Right Interactive Card Canvas */}
        <div className="flex-1 relative w-full min-h-[180px] lg:h-[280px] flex items-center justify-center lg:justify-end select-none">
          <div className="flex items-center gap-3 sm:gap-4 lg:translate-x-12">
            {sliderImages.map((item, index) => {
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`relative h-[350px] sm:h-[410px] rounded-3xl overflow-hidden transition-all duration-700 ease-out cursor-pointer shadow-2xl group
                    ${isActive 
                      ? "w-[260px] sm:w-[340px] lg:w-[300px] z-20 opacity-100 scale-100 ring-1 ring-white shadow-brand-500/10" 
                      : "w-14 sm:w-20 lg:w-24 z-10 opacity-40 grayscale hover:opacity-70 hover:grayscale-0"
                    }`}
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />

                  {/* Top Floating Badge (Social Proof) - Active Slide Only */}
                  <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all duration-500 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <ShoppingCart size={13} className="text-brand-500" />
                    <span className="text-[10px] font-extrabold text-gray-900 tracking-tight">
                      {item.orders} {t('hero_sold')}
                    </span>
                  </div>

                  {/* Bottom Premium Info Card Glassmorphism overlay - Active Slide Only */}
                  <div className={`absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-gray-950/90 via-gray-950/60 to-transparent pt-20 transition-opacity duration-500 flex flex-col justify-end ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="space-y-1.5 text-white">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-base sm:text-lg leading-tight truncate">{item.title}</h3>
                        <span className="font-black text-brand-400 text-sm shrink-0">{item.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-white">{item.rating}</span>
                        </div>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{t('hero_free_delivery')}</span>
                      </div>
                    </div>

                    {/* Pagination Indicator Dots */}
                    <div className="mt-4 flex gap-1.5 justify-center">
                      {sliderImages.map((_, dotIndex) => (
                        <div 
                          key={dotIndex}
                          className={`rounded-full transition-all duration-500 ${
                            activeIndex === dotIndex 
                              ? "w-5 h-1.5 bg-brand-500" 
                              : "w-1.5 h-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Header;