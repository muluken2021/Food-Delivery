import React from "react";
import { User, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Sign In / Login",
    description: "Create account to start ordering your favorite food",
    step: "01"
  },
  {
    icon: ShoppingCart,
    title: "Select & Order",
    description: "Pick your favorite dishes and add them to your cart",
    step: "02"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your fresh, hot food delivered straight to your door",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to get your favorite food delivered
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                  {step.step}
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-2 left-full w-16 h-1 bg-yellow-400/60 transform translate-x-4"></div>
                )}

                {/* Card Content */}
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 pt-12">
                  <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
