import React from "react";
import restaurantImage from "../assets/restorant.jpg";
import { Link } from "react-router-dom";
import { Clock, ShieldCheck, Heart, Leaf } from "lucide-react";
import { assets } from "../assets/assets";
import HowItWorks from "./HowItWorks";

const About = () => {
  const stats = [
    { label: "Years of Experience", value: "12+" },
    { label: "Daily Deliveries", value: "500+" },
    { label: "Happy Customers", value: "10k+" },
    { label: "Specialty Dishes", value: "45+" },
  ];

  const values = [
    {
      icon: <Leaf className="text-green-500" size={24} />,
      title: "Fresh Ingredients",
      desc: "Sourced daily from local organic farms to ensure peak flavor.",
    },
    {
      icon: <Clock className="text-orange-500" size={24} />,
      title: "Fast Delivery",
      desc: "Our optimized logistics ensure your food arrives piping hot.",
    },
    {
      icon: <Heart className="text-red-500" size={24} />,
      title: "Cooked with Love",
      desc: "Each recipe is a balance of tradition and culinary passion.",
    },
    {
      icon: <ShieldCheck className="text-blue-500" size={24} />,
      title: "Highest Hygiene",
      desc: "Strict safety protocols from the kitchen to your doorstep.",
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Top Section: Story & Image */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          {/* Text Content */}
          <div className="flex-1">
          <div className="max-w-xl text-left mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-500"></span>
              <span className="text-brand-500 font-bold tracking-widest uppercase text-xs">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              About Us Foods For <span className=" bg-clip-text bg-gradient-to-r text-brand-500 ">Your Family</span>  
            </h2>
          </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                DashDine Restaurant is passionate about bringing fresh, delicious,
                and authentic meals right to your doorstep. We combine traditional
                Ethiopian flavors with modern culinary techniques to create a dining
                experience you’ll never forget.
              </p>
              <p>
                Our chefs carefully select ingredients to ensure every dish is
                bursting with flavor and freshness. Whether you crave classic
                favorites or innovative dishes, we promise quality and speed.
              </p>
            </div>

            <div className="mt-10">
               <Link to="/menu">
                  <button className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-15 rounded-4xl transition-all active:scale-95">
                    Order now
                  </button>
                </Link>
            </div>
          </div>

          {/* Featured Image with Decorative Elements */}
          <div className="flex-1 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32  -animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 "></div>
            
            <img
              src={assets.deliveryman}
              alt="Restaurant Interior"
              className="w-full h-[500px] object-cover rounded-[2.5rem] "
            />
            
            {/* Floating Badge on Image */}
            <div className="absolute bottom-10 -left-5 bg-white p-6 rounded-sm shadow-xl border border-slate-100 hidden md:block">
              <p className="text-2xl font-semibold text-brand-500">100%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Natural Taste</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-black text-gray-700 mb-2">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <HowItWorks />

      </div>
    </section>
  );
};

export default About;