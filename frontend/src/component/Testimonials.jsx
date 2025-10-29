import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Abel Abera",
    review:
      "Order and Enjoy Our Delicious Food. Fast, fresh, and made to satisfy your cravings.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sara T.",
    review:
      "Amazing meals and great service. I always enjoy ordering from DashDine!",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Daniel H.",
    review:
      "Fresh ingredients and perfect presentation. Always a delight to order!",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`w-full py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-50"
      }`}
    >


      <div className="container mx-auto px-6 sm:px-12 lg:px-24 text-center">
<div className="text-center mb-12">
  <h2
    className={`text-3xl sm:text-4xl font-extrabold mb-4 relative inline-block ${
      theme === "dark" ? "text-white" : "text-gray-700"
    }`}
  >
   Our Customers Say
  </h2>
  {/* Decorative lines with circle */}
  <div className="flex items-center justify-center gap-2 mb-4">
    <span className={`h-[4px] w-36 ${theme === "dark" ? "bg-[#e58d00]" : "bg-[#e58d00]"}`}></span>
    <span className={`h-5 w-5 rounded-full ${theme === "dark" ? "bg-[#e58d00]" : "bg-[#e58d00]"}`}></span>
    <span className={`h-[4px] w-36 ${theme === "dark" ? "bg-[#e58d00]" : "bg-[#e58d00]"}`}></span>
  </div>
  <p
    className={`text-base sm:text-lg ${
      theme === "dark" ? "text-white/80" : "text-gray-600"
    }`}
  >
     Order and enjoy our delicious food. Fast, fresh, and made to satisfy your cravings.
  </p>
</div>
        

        {/* Testimonials Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`
                flex-1 max-w-sm p-6 rounded-2xl transition-transform duration-300
               
                ${theme === "dark" ? "bg-white/10 text-white" : "bg-white/20 text-gray-800"}
                hover:scale-105 hover:border-yellow-300 shadow-md hover:shadow-xl backdrop-blur-md
              `}
            >
              <div className="flex flex-col items-center gap-3 mb-4">
                <Quote className="w-6 h-6 text-[#e58d00]" />
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <h3 className="font-semibold text-center">{t.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-center">{t.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
