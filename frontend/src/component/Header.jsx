import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { assets } from "../assets/assets";

const Header = () => {
  // Array of images for the slider
  const sliderImages = [
    { id: 0, img: assets.foodhero, orders: "850" },
    { id: 1, img: assets.herofood2, orders: "1290" },
    { id: 2, img: assets.foodhero3, orders: "940" },
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Default to middle card

  // Automatic Change logic (every 4 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden sm:pt-0 pt-20">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Content Area */}
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="max-w-xl text-left mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-500"></span>
              <span className="text-brand-500 font-bold tracking-widest uppercase text-xs">Dashdine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
              Order Our Foods For <br /> 
              <span className="bg-clip-text text-brand-500">Your Family</span>  
            </h2>
          </div>
          
          <p className="text-gray-500 text-md md:text-lg mb-10 max-w-lg leading-relaxed">
            Discover fresh flavors and authentic recipes delivered straight to your home. 
            Healthy, delicious, and made with love.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link to="/menu">
              <button className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-10 rounded-full transition-all active:scale-95 shadow-lg shadow-brand-100">
                Order now
              </button>
            </Link>
            
            <Link to="/reseller">
              <button className="cursor-pointer bg-brand-25 text-brand-500 font-bold py-4 px-10 rounded-full transition-all hover:bg-brand-50 active:scale-95">
                Join reseller
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Interactive Floating Card Layout */}
        <div className="flex-1 relative w-full h-[600px] flex items-center justify-center lg:justify-end overflow-visible">
          
          <div className="flex items-center gap-4 lg:translate-x-20">
            {sliderImages.map((item, index) => {
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`relative h-[450px] rounded-[1rem] overflow-hidden border border-gray-100 transition-all duration-700 ease-in-out cursor-pointer shadow-xl
                    ${isActive 
                      ? "w-[300px] lg:w-[400px] z-20 opacity-100 scale-105" 
                      : "w-20 lg:w-28 z-10 opacity-60 grayscale-[50%]"
                    }`}
                >
                  <img 
                    src={item.img} 
                    alt="Food item" 
                    className="w-full h-full object-cover" 
                  />

                  {/* Overlay Content (Only visible on active card) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    
                    {/* "Ordered" Badge */}
                    <div className="absolute top-6 right-5 bg-white/90 backdrop-blur-md shadow-md px-3 py-2 rounded-xl flex items-center gap-2">
                      <ShoppingCart size={14} className="text-[#FF4F18]" />
                      <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tight">
                        {item.orders} ordered
                      </span>
                    </div>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                      {sliderImages.map((_, dotIndex) => (
                        <div 
                          key={dotIndex}
                          className={`rounded-full transition-all duration-500 ${
                            activeIndex === dotIndex 
                              ? "w-4 h-1.5 bg-[#FF4F18]" 
                              : "w-1.5 h-1.5 bg-white/60"
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