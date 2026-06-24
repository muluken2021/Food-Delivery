import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useTranslation } from "../context/LanguageContext";

const PromotionalBanners = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-white py-12 select-none">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Banner 1 */}
        <div className="relative overflow-hidden bg-brand-50 rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[320px] group transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50">
          <div className="max-w-[65%] sm:max-w-[60%] space-y-4 z-10">
            <div className="flex justify-between">
              <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-black/5 px-3 py-1 rounded-full text-xs font-semimedium text-emerald-900 tracking-tight">
                {t('promo_banner1_tag')}
              </div>
              <div className="text-red-600 sm:text-lg text-sm font-medium absolute top-4 right-4 bg-white p-3 rounded-full">-5%</div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              {t('promo_banner1_title')}
            </h3>
            <p className="text-sm sm:text-lg text-gray-700 leading-tight tracking-tight">
              {t('promo_banner1_title')}
            </p>
          </div>
          <div className="z-10 mt-6 md:mt-0">
            <Link to="/menu">
              <button className="bg-black hover:bg-brand-500 text-white font-medium text-sm py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95 duration-300 cursor-pointer">
                {t('promo_banner1_cta')}
              </button>
            </Link>
          </div>
          <img
            src={assets.cardfood2 || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60"}
            alt="food bundle"
            className="absolute right-[-20px] bottom-[-10px] w-[80%] max-w-[340px] h-auto object-contain transition-transform duration-500 group-hover:scale-105 origin-bottom"
          />
        </div>

        {/* Banner 2 */}
        <div className="relative overflow-hidden bg-brand-500 rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[320px] group transition-all duration-300 hover:shadow-xl hover:shadow-lime-100/50">
          <div className="max-w-[65%] sm:max-w-[60%] space-y-4 z-10">
            <div className="flex justify-between">
              <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-black/5 px-3 py-1 rounded-full text-xs font-semimedium text-lime-900 tracking-tight">
                {t('promo_banner2_tag')}
              </div>
              <div className="text-red-600 sm:text-lg text-sm font-medium absolute top-4 right-4 bg-white p-3 rounded-full">-10%</div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-100 leading-tight tracking-tight">
              {t('promo_banner2_title')}
            </h3>
            <p className="text-sm sm:text-lg text-gray-200 leading-tight tracking-tight">
              {t('promo_banner1_title')}
            </p>
          </div>
          <div className="z-10 mt-6 md:mt-0">
            <Link to="/menu">
              <button className="bg-white hover:bg-white/90 text-black font-medium text-sm py-3.5 px-6 rounded-full shadow-md transition-all active:scale-95 duration-300 cursor-pointer">
                {t('promo_banner2_cta')}
              </button>
            </Link>
          </div>
          <img
            src={assets.cardfood1 || "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=60"}
            alt="drinks bundle"
            className="p-5 absolute right-[-10px] bottom-[-10px] w-[80%] max-w-[280px] h-auto object-contain transition-transform duration-500 group-hover:scale-105 origin-bottom"
          />
        </div>

      </div>
    </section>
  );
};

export default PromotionalBanners;
