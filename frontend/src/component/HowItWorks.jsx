import React from 'react';
import { assets } from '../assets/assets';


const ServiceCard = ({ title, description, img }) => (
  <div className="flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300 hover:scale-105">
    {/* Image/Icon Container */}
    <div className="w-64 h-64 mb-8 flex items-center justify-center ">
      <img src={img} alt="img" />
      {/* If using custom images, use: <img src={src} alt={title} className="w-full h-full object-contain" /> */}
    </div>
    
    <h3 className="text-3xl font-bold text-gray-900 mb-4">
      {title}
    </h3>
    
    <p className="text-gray-500 leading-relaxed max-w-xs">
      {description}
    </p>
  </div>
);

const HowItWorks = () => {
  const services = [
    {
      title: "Online Order",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      img: assets.service1,
    },
    {
      title: "Fast delivery",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
       img: assets.service2,
    },
    {
      title: "Takeaway",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
       img: assets.service3,
    }
  ];

  return (
    <section className="py-0 bg-white font-sans">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-5">
          <span className="uppercase tracking-[0.3em] text-gray-500 text-sm font-medium">
            FEATURES
          </span>
          <h2 className="text-4xl font-bold mt-4 mb-2">
            <span className="text-brand-600">Our</span> Services
          </h2>
          <p className="text-gray-600 italic">Your favourite food partner</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              img={service.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;