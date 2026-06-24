import React from "react";
import { Link } from "react-router-dom";
import { Clock, ShieldCheck, Heart, Leaf } from "lucide-react";
import { assets } from "../assets/assets";
import HowItWorks from "./HowItWorks";
import { useTranslation } from "../context/LanguageContext";

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('stat_experience'), value: "12+" },
    { label: t('stat_deliveries'), value: "500+" },
    { label: t('stat_customers'), value: "10k+" },
    { label: t('stat_dishes'), value: "45+" },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Top Section: Story & Image */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          {/* Text Content */}
          <div className="flex-1">
            <div className="max-w-xl text-left mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-brand-500"></span>
                <span className="text-brand-500 font-bold tracking-widest uppercase text-xs">{t('about_label')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                {t('about_heading')} <span className="bg-clip-text bg-gradient-to-r text-brand-500">{t('about_heading_highlight')}</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>{t('about_p1')}</p>
              <p>{t('about_p2')}</p>
            </div>

            <div className="mt-10">
              <Link to="/menu">
                <button className="cursor-pointer bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-15 rounded-4xl transition-all active:scale-95">
                  {t('about_order_now')}
                </button>
              </Link>
            </div>
          </div>

          {/* Featured Image with Decorative Elements */}
          <div className="flex-1 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 -animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48"></div>
            
            <img
              src={assets.deliveryman}
              alt="Restaurant Interior"
              className="w-full h-[500px] object-cover rounded-[2.5rem]"
            />
            
            {/* Floating Badge on Image */}
            <div className="absolute bottom-10 -left-5 bg-white p-6 rounded-sm shadow-xl border border-slate-100 hidden md:block">
              <p className="text-2xl font-semibold text-brand-500">100%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('about_natural')}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-100 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-semibold text-gray-700 mb-2">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services / How It Works Section */}
        <HowItWorks />

      </div>
    </section>
  );
};

export default About;
