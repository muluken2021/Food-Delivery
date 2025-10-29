import React, { useContext } from "react";
import heroImage from "../assets/herofood.png";
import { ThemeContext } from "../context/ThemeContext";
import { Star, ThumbsUp, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({setLogin}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`relative w-full overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 lg:py-10 flex flex-col-reverse lg:flex-row items-center gap-0">
        
        {/* Text Section */}
        <div className="flex-1 relative z-10 text-center lg:text-left">
          <h2
            className={`text-2xl sm:text-3xl font-semibold mb-3 transition-colors duration-300 ${
              theme === "dark" ? "text-neutral-400" : "text-gray-600"
            }`}
          >
            DashDine Restaurant 
          </h2>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="block">Fast Delivery,</span>
            <span className="text-[#e58d00]">Fresh Taste.</span>
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 transition-colors duration-300 ${
              theme === "dark" ? "text-white/80" : "text-gray-700"
            }`}
          >
            Order your favorite Ethiopian and modern meals from ZestBite. Hot,
            fresh, and delivered straight to your door in minutes.
          </p>

          <div className="flex flex-col gap-4 sm:flex-col lg:flex-row justify-center lg:justify-start">
            <button
              onClick={() => setLogin(true)}
              className="bg-[#e58d00] hover:bg-yellow-500 text-white font-bold rounded-2xl px-8 sm:px-10 py-4 text-lg sm:text-xl transition-transform transform hover:scale-105 w-full lg:w-auto"
            >
              Order Now
            </button>

            <Link to="/menu" className="w-full lg:w-auto">
              <button
                className={`border-2 rounded-2xl px-8 sm:px-10 py-4 text-lg sm:text-xl font-bold transition-all duration-300 w-full lg:w-auto ${
                  theme === "dark"
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-[#e58d00] text-[#e58d00] hover:bg-[#e58d00] hover:text-white"
                }`}
              >
                View Menu
              </button>
            </Link>
          </div>

        </div>

        {/* Image Section with Rectangle Badges */}
        <div className="flex-1 relative flex justify-center  lg:justify-end">
          <div className="relative">
            <img
              src={heroImage}
              alt="Delicious food"
              className="w-xl max-w-sm sm:max-w-md lg:max-w-7xl h-auto object-cover drop-shadow-xl rounded-xl"
            />

            {/* ⭐ Rating Badge */}
            <div className="absolute top-4 left-3 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-lg shadow-xl px-13 py-2 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 border border-yellow-200">
              <Star className="w-4 h-4 sm:w-6 sm:h-6 text-[#e58d00] fill-[#e58d00]" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800">
                  4.9/5 Rating
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Loved by 10k+ customers
                </p>
              </div>
            </div>

            {/* 🚚 Fast Delivery Badge */}
            <div className="absolute bottom-32 left-5 sm:left-0 bg-[#e58d00]/90 backdrop-blur-lg shadow-xl px-4 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 border border-white/30">
              <Truck className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  Fast Delivery
                </h3>
                <p className="text-[10px] sm:text-xs text-white/90">
                  Under 30 minutes
                </p>
              </div>
            </div>

            {/* 👍 Top Taste Badge */}
            <div className="absolute bottom-6 right-3 sm:right-6 bg-white/90 backdrop-blur-lg shadow-xl px-3 py-2 sm:px-5 sm:py-3 rounded-xl flex items-center gap-2 sm:gap-3 border border-yellow-200">
              <ThumbsUp className="w-4 h-4 sm:w-6 sm:h-6 text-[#e58d00]" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-800">
                  Top Taste
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Award-Winning Flavors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
