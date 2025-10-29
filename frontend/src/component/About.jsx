import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import restaurantImage from "../assets/restorant.png"; // your restaurant image
import { Link } from "react-router-dom";

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-white"
      }`}
    >
      <div className="max-w-full lg:mx-20 flex flex-col-reverse lg:flex-row items-center gap-12 px-6">
        
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2
            className={`text-3xl sm:text-5xl font-extrabold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            About DashDine Restaurant
          </h2>
          <p
            className={`text-base sm:text-lg mb-6 ${
              theme === "dark" ? "text-white/80" : "text-gray-700"
            }`}
          >
            DashDine Restaurant is passionate about bringing fresh, delicious, and authentic meals right to your doorstep. We combine traditional Ethiopian flavors with modern culinary techniques to create a dining experience you’ll never forget.
          </p>
          <p
            className={`text-base sm:text-lg mb-6 ${
              theme === "dark" ? "text-white/80" : "text-gray-700"
            }`}
          >
            Our chefs carefully select ingredients to ensure every dish is bursting with flavor and freshness. Whether you crave classic favorites or innovative dishes, ZestBite promises quality, speed, and satisfaction with every bite.
          </p>
          <Link to="/menu">
          <button className="bg-[#e58d00] hover:bg-yellow-500 text-white font-bold rounded-2xl px-8 py-3 text-lg transition-transform transform hover:scale-105">
            Explore Menu
          </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={restaurantImage}
            alt="Restaurant"
            className="w-full max-w-md lg:max-w-lg h-auto rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
