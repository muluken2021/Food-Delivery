import React from "react";
import heroFood from "../assets/food_del_img2.png"; // adjust path if needed
import { ChevronRight } from 'lucide-react';

const Hero = ({scrollToMenu}) => {
  return (
    <section className="xl:pt-0 pt-0 sm:pt-25 relative min-h-[60vh] bg-[#0B1726]  flex items-center justify-center overflow-hidden px-6 lg:px-32">

      {/* Background Overlay
      <div className="absolute inset-0 bg-black/40"></div> */}

      <div className="text-center lg:text-left container  relative z-10">
      <div className="pb-24  sm:pt-20  grid lg:grid-cols-2 gap-12 items-center">

            {/* Right Content - Hero Image */}
            <div className="pt-8 relative order-first lg:order-last">
              <div className="w-full max-w-lg  lg:mx-0 rounded-3xl overflow-hidden transform hover:scale-105 transition duration-500">
                <img
                  src={heroFood}
                  alt="Delicious food delivery"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 rounded-full -z-1"></div>
            </div>

            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight">
                Order Your <span className="text-yellow-400">Favorite Food</span> Anytime
              </h1>
              <p className="text-sm md:text-lg text-white/90 max-w-md mx-auto lg:mx-0">
                Fresh, fast, and delicious meals delivered from the best local
                restaurants straight to your door.
              </p>

              <button
                className="group relative px-12 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-lg font-semibold rounded-full shadow overflow-hidden cursor-pointer flex items-center gap-2 mx-auto lg:mx-0 block lg:inline-flex"
                onClick={scrollToMenu}
              >
                Explore Food
                <ChevronRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </button>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 pt-4">
                {[{ value: "10K+", label: "Happy Customers" },
                  { value: "500+", label: "Restaurants" },
                  { value: "30min", label: "Avg Delivery" }]
                  .map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

      </div>
    </section>
  );
};

export default Hero;
