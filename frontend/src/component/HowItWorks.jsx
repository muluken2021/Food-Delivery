import React, { useContext } from "react";
import { User, ShoppingCart, Truck } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const steps = [
  {
    icon: User,
    title: "Sign In / Login",
    description: "Create an account to start ordering your favorite food",
    step: "01",
  },
  {
    icon: ShoppingCart,
    title: "Select & Order",
    description: "Pick your favorite dishes and add them to your cart",
    step: "02",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your fresh, hot food delivered straight to your door",
    step: "03",
  },
];

const HowItWorks = () => {
  const { theme } = useContext(ThemeContext);

  const sectionBg = theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-white/5 backdrop-blur-md" : "bg-white/70 backdrop-blur-sm";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const subTextColor = theme === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <section className={`py-20 ${sectionBg} transition-colors duration-300`}>
      <div className="container mx-auto px-6 text-center">
        <div className="text-center mb-12">
  <h2
    className={`text-3xl sm:text-4xl font-extrabold mb-4 relative inline-block ${
      theme === "dark" ? "text-white" : "text-gray-700"
    }`}
  >
   How It Works
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
     Three simple steps to get your favorite food delivered
  </p>
</div>
       

        {/* Steps */}
        <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`group relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 ${cardBg}`}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-black" />
              </div>

              {/* Step number */}
              <div className="text-yellow-400 font-bold mb-2 text-lg">{step.step}</div>

              {/* Title */}
              <h3 className={`text-xl font-semibold mb-3 ${textColor}`}>{step.title}</h3>

              {/* Description */}
              <p className={`text-sm sm:text-base leading-relaxed ${subTextColor}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
