import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import img1 from "../assets/card-food-1.png";

const Header = () => {
  const { t } = useTranslation();

  // Featured products with transparent PNG food images
  const featuredProducts = [
    {
      id: 1,
      title: "Hot Coffee",
      price: "$10",
      image: img1,
    },
    {
      id: 2,
      title: "Hot Coffee",
      price: "$10",
      image: "https://png.pngtree.com/png-clipart/20230412/original/pngtree-coffee-cup-cappuccino-transparent-png-image_9049449.png",
    },
    {
      id: 3,
      title: "Hot Coffee",
      price: "$10",
      image: "https://png.pngtree.com/png-clipart/20230412/original/pngtree-coffee-cup-cappuccino-transparent-png-image_9049449.png",
    },
    {
      id: 4,
      title: "Hot Coffee",
      price: "$10",
      image: "https://png.pngtree.com/png-clipart/20230412/original/pngtree-coffee-cup-cappuccino-transparent-png-image_9049449.png",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#F2F6F9] flex items-center overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left pr-0 lg:pr-6">
            <span className="text-sm md:text-base font-medium tracking-wider text-black uppercase mb-6">
              {t('hero_badge') || "SHOP BETTER"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.15] mb-6">
              {t('hero_title') || "Meet Yegna Byte, order our food and engoy your meal"}
            </h1>

            <p className="text-base sm:text-lg text-black font-normal leading-relaxed mb-8">
              {t('hero_description') || "yegna byte your first food ordering choice"}
            </p>

            <Link to="/menu">
              <button className="bg-[#608C3A] hover:bg-[#507730] text-white font-medium text-sm py-3.5 px-8 rounded-none transition-colors duration-200 cursor-pointer">
                {t('hero_shop_now') || "SHOP Now"}
              </button>
            </Link>
          </div>

          {/* Right Product Grid Column */}
          <div className="lg:col-span-6 relative">
            
            {/* Green Circle Shape Behind Cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-[#3C6E00] rounded-full z-0 pointer-events-none" />

            {/* Product Cards Container */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`bg-[#DCDCDC] p-6 sm:p-8 flex flex-col justify-between rounded-none shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                    index % 2 !== 0 ? "translate-y-10 sm:translate-y-12" : ""
                  }`}
                >
                  {/* Transparent Food Image Container */}
                  <div className="w-full flex justify-center items-center h-28 sm:h-36 mb-6">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-left">
                    <h3 className="text-base sm:text-lg font-normal text-black leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-sm sm:text-base font-normal text-black mt-1">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Header;