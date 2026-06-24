import React from 'react';
import { assets } from '../assets/assets';
import { useTranslation } from '../context/LanguageContext';


const ServiceCard = ({ title, description, img }) => (
  <div className="flex flex-col items-center text-center p-8 rounded-xl transition-all duration-300 hover:scale-105">
    <div className="w-64 h-64 mb-8 flex items-center justify-center ">
      <img src={img} alt="img" />
    </div>
    
    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
      {title}
    </h3>
    
    <p className="text-gray-500 leading-relaxed max-w-xs">
      {description}
    </p>
  </div>
);

const HowItWorks = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('service_online_order'),
      description: t('service_online_order_desc'),
      img: assets.service1,
    },
    {
      title: t('service_fast_delivery'),
      description: t('service_fast_delivery_desc'),
      img: assets.service2,
    },
    {
      title: t('service_takeaway'),
      description: t('service_takeaway_desc'),
      img: assets.service3,
    }
  ];

  return (
    <section className="py-0 bg-white font-sans">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5">
          <span className="uppercase tracking-[0.3em] text-gray-500 text-sm font-medium">
            {t('services_label')}
          </span>
          <h2 className="text-4xl font-bold mt-4 mb-2">
            <span className="text-brand-600">{t('services_heading_highlight')}</span> {t('services_heading_rest')}
          </h2>
          <p className="text-gray-600 italic">{t('services_subtitle')}</p>
        </div>

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