import React from "react";
import { Star } from "lucide-react";
import { useTranslation } from "../context/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: "Sophia Martinez",
    review: "I Mostly Shop For Organic Products, And I'm Really Impressed With The Variety Available. The Produce Feels Farm-Fresh.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 2,
    name: "Daniel Roberts",
    review: "My Order Arrived Earlier Than Expected, And Everything Was Neatly Packed. Nothing Was Damaged. Very Impressed!",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    review: "I Ordered Vegetables And Fruits In The Morning, And They Arrived Within Hours. Everything Was Fresh And Perfectly Packed.",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
       
        <div className="text-center mb-7">
         <h2 className=" text-center md:text-center text-4xl md:text-4xl font-semibold tracking-tight text-gray-900">
               {t('testimonials_heading')} <span className=" bg-clip-text bg-gradient-to-r text-brand-500 ">{t('testimonials_heading_highlight')}</span> {t('testimonials_heading_rest')}</h2>
          <p className="text-gray-600 italic">{t('testimonials_subtitle')}</p>
      </div>

        {/* Clean Testimonials Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 ${
                index === 1 ? "md:translate-y-6" : ""
              }`}
            >
              {/* Star Rating Group */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed font-medium">
                {t.review}
              </p>

              {/* User Identity Footer */}
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover bg-gray-100"
                />
                <span className="font-semibold text-sm text-gray-900">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;