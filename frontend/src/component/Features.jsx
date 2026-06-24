import React from 'react';
import { assets } from '../assets/assets';
import { Bike, BookOpen, Sandwich } from "lucide-react";
import { useTranslation } from '../context/LanguageContext';

const Features = () => {
  const { t } = useTranslation();

const features = [
  {
    title: t('feature1_title'),
    desc: t('feature1_desc'),
    icon: Bike,
    iconBg: "bg-orange-50",
  },
  {
    title: t('feature2_title'),
    desc: t('feature2_desc'),
    icon: BookOpen,
    iconBg: "bg-yellow-50",
  },
  {
    title: t('feature3_title'),
    desc: t('feature3_desc'),
    icon: Sandwich,
    iconBg: "bg-red-50",
  }
];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-24 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Featured Image */}
        <div className="flex-1">
          <div className="relative rounded-[1rem] overflow-hidden ">
            <img 
              src={assets.herofood4} 
              alt="Healthy Salad" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right: Feature Cards */}
        <div className="flex-1 space-y-6">
          <h2 className="text-center md:text-left text-4xl md:text-4xl font-semibold text-gray-700 mb-8">
            {t('features_heading')}
          </h2>

          <div className="space-y-4">
            {features.map((item, index) => {
              const Icon = item.icon;

          return (
              <div 
                key={index}
                className="group flex items-start gap-6 p-6 rounded-[2rem] border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
              >
                {/* Icon Circle */}
                 <div className={`p-4 rounded-lg `}>
                    <Icon size={28} className="text-brand-500" />
                  </div>
                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>) 
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;