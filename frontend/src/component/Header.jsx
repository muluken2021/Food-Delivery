import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Sparkles, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useTranslation } from "../context/LanguageContext";

const Header = () => {
  const { t } = useTranslation();

  // Static list of food items displayed as cards at the bottom
  const foodCards = [
  {
    id: 0,
    img: "https://static.spotapps.co/spots/c9/1576f30d884094a348bb132d956b4b/full",
    title: "Doro Wot",
    category: "Main Dish",
    price: "$12.99",
    rating: "4.9",
  },
  {
    id: 1,
    img: "https://ristorante-africa.it/assets/images/tibs.jpg",
    title: "Tibs",
    category: "Main Dish",
    price: "$13.50",
    rating: "4.8",
  },
  {
    id: 2,
    img: "https://images.sbs.com.au/dims4/default/2cd278b/2147483647/strip/true/crop/1500x844%2B0%2B93/resize/1280x720%21/quality/90/?imwidth=1280&url=http%3A%2F%2Fsbs-au-brightspot.s3.amazonaws.com%2Fdrupal%2Ffood%2Fpublic%2Frx084_vip_3_of_6.jpg",
    title: "Shiro Wot",
    category: "Vegetarian",
    price: "$9.50",
    rating: "4.7",
  },
  {
    id: 3,
    img: "https://images.ctfassets.net/qzslvo8u2q4l/6tucjh8P7G3EIi5tzdL9Jh/21415180cbcbebda5c7f1d2463c9a167/Addis_Ababa_LunchFood__16_.png",
    title: "Beyaynetu",
    category: "Traditional",
    price: "$11.00",
    rating: "5.0",
  },
  {
    id: 4,
    img: "https://static.takeaway.com/images/restaurants/ch/RO00O3QN/products/9446683_liyuethiopianrestaurant_food_tibs_1x1.png",
    title: "Special Tibs",
    category: "Specialty",
    price: "$14.00",
    rating: "4.9",
  },
];

  return (
    <section className="relative w-full bg-white text-neutral-900 pt-22 pb-20 overflow-hidden select-none">
      
      {/* Decorative Sparkle / Floating Accents */}
      <div className="absolute top-20 right-[20%] text-amber-400 rotate-12 pointer-events-none">
        <Sparkles size={28} />
      </div>
      <div className="absolute top-40 left-[15%] text-purple-400 -rotate-12 pointer-events-none">
        <Sparkles size={22} />
      </div>
      <div className="absolute bottom-1/2 right-[12%] text-lime-500 rotate-45 pointer-events-none">
        <Sparkles size={20} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl text-center relative z-10 flex flex-col items-center">
        
        {/* Top Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 bg-white shadow-sm text-xs font-medium text-neutral-700 mb-8">
          <Sparkles size={14} className="text-neutral-900" />
          <span>{t('hero_badge') || "Powered by Yegna Byte"}</span>
        </div>

        {/* Center Hero Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.08] max-w-4xl">
          {t('hero_title') || "Elevating Your Dining Experience with"} <br className="hidden sm:inline" />
          <span className="text-neutral-900">{t('hero_subtitle') || "Innovative Culinary Delights"}</span>
        </h1>

        {/* Subtitle Paragraph */}
        <p className="mt-6 text-base sm:text-lg text-neutral-500 max-w-2xl leading-relaxed font-normal">
          {t('hero_description') || "At Yegna Byte, we blend fresh artisanal ingredients and flavor mastery to create dishes that not only satisfy but truly elevate your palate."}
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/menu">
            <button className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm py-3.5 px-7 rounded-xl shadow-md transition-all active:scale-95 duration-200 cursor-pointer">
              {t('hero_shop_now') || "Order Online"}
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-sm py-3.5 px-7 rounded-xl border border-neutral-300 transition-all active:scale-95 duration-200 cursor-pointer">
              Explore Menu
            </button>
          </Link>
        </div>

        {/* Bottom Food Cards Grid */}
        <div className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {foodCards.map((card) => (
            <div
              key={card.id}
              className="group relative h-[360px] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end text-left"
            >
              {/* Card Image */}
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Glassmorphism Details Overlay at Bottom */}
              <div className="relative z-10 p-4 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-transparent pt-12 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 block mb-1">
                  {card.category}
                </span>
                <h3 className="font-bold text-sm leading-snug line-clamp-1 group-hover:text-lime-300 transition-colors">
                  {card.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-xs pt-1 border-t border-white/10">
                  <span className="font-extrabold text-white">{card.price}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
                    <Star size={12} className="fill-amber-400" />
                    <span>{card.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Header;