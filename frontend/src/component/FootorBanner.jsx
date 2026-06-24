import React from "react";
import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useTranslation } from "../context/LanguageContext";

const FootorBanner = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full px-6 sm:px-12 lg:px-24 py-8 select-none">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-50 via-brand-300 to-brand-500 border border-gray-100 flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 lg:px-25 ">
          
          {/* Decorative Grid Background Effect */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Left: Content Block */}
          <div className="relative z-10 max-w-xl text-left flex flex-col justify-center items-start space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-[1.15]">
              {t('footer_banner_title')} <br />
              {t('footer_banner_title2')} <span className="font-serif italic font-medium text-gray-800">{t('footer_banner_freshness')}</span>
            </h2>
            
            <p className="text-gray-600 font-medium text-sm sm:text-base max-w-md leading-relaxed">
              {t('footer_banner_desc')}
            </p>

            <button className="group mt-2 flex items-center gap-2 bg-black text-white font-medium px-6 py-3.5 rounded-full hover:bg-gray-900 transition-all active:scale-98 shadow-md shadow-black/10 cursor-pointer">
              <span className="text-sm tracking-wide">{t('footer_banner_cta')}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right: Floating Product Basket */}
          <div className="relative z-10 mt-8 md:mt-0 flex items-center justify-center w-full md:w-auto">
            {/* Soft Shadow Base under the basket */}
            <div className="absolute bottom-4 w-4/5 h-8 bg-black/10 blur-xl rounded-full mix-blend-multiply" />
            
            <img 
              src={assets.cardfood1}
              alt="Fresh vegetables grocery basket" 
              className="w-[280px] sm:w-[360px] md:w-[300px] lg:w-[330px] h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.08)] animate-[float_4s_ease-in-out_infinite]"
            />
          </div>

        </div>
      </div>

      {/* Embedded CSS animation for the slight modern floating effect */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default FootorBanner;