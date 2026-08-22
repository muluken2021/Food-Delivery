import React from "react";
import { useTranslation } from "../context/LanguageContext";

const testimonialsRow1 = [
  {
    id: 1,
    name: "Michael Thompson",
    role: "DreamWorks Agency",
    review: "A perfect solution for quick and professional web design. Excellent templates for any project.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Daniel Lewis",
    role: "Founder, Tech Inno",
    review: "Snapkit helped us build amazing websites quickly. Great designs and reliable templates.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Liam Clark",
    role: "Freelance Designer",
    review: "Fantastic templates that are both creative and practical. A huge time-saver for designers.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "John Smith",
    role: "Senior Designer, Pixel Lab",
    review: "Snapkit templates transformed our website design process. Exceptional quality and easy-to-use.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const testimonialsRow2 = [
  {
    id: 5,
    name: "Sophia Martinez",
    role: "Founder, InnoTech Ltd",
    review: "The templates are beautifully crafted. Made my design process much easier and faster.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: 6,
    name: "Ava Harris",
    role: "Founder, Tech Inno",
    review: "Love the clean and modern design style! Snapkit templates have made my work so efficient.",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  },
  {
    id: 7,
    name: "Isabella King",
    role: "Founder, Studio X",
    review: "Snapkit's templates are easy to implement and have a polished, professional finish every time.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 8,
    name: "Emma Wilson",
    role: "Lead Creative",
    review: "The best resource for modern UI designs. Beautiful layout systems and highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const Testimonials = () => {
  const { t } = useTranslation();

  // Duplicate arrays for seamless infinite marquee loop
  const row1Duplicated = [...testimonialsRow1, ...testimonialsRow1];
  const row2Duplicated = [...testimonialsRow2, ...testimonialsRow2];

  return (
    <section className="py-24 bg-[#f8f9fa] overflow-hidden select-none relative">
      
      {/* CSS Keyframes for Marquee Effect */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 35s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Top Header Section */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-xs text-xs font-semibold text-neutral-800 mb-6">
            Testimonials
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            {t('testimonials_heading') || "What designers think"}
          </h2>

          <p className="text-neutral-500 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            {t('testimonials_subtitle') || "Hear directly from those we've partnered with, from small to large companies."}
          </p>
        </div>
      </div>

      {/* Edge Blur Overlays for Smooth Transition */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

      {/* Marquee Rows Wrapper */}
      <div className="space-y-6">
        
        {/* Row 1: Moving to Left */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee-left gap-6 pr-6">
            {row1Duplicated.map((item, index) => (
              <div
                key={`row1-${item.id}-${index}`}
                className="w-[340px] bg-white p-7 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-[190px] shrink-0 hover:shadow-md transition-shadow"
              >
                <p className="text-neutral-700 text-sm leading-relaxed font-normal">
                  {item.review}
                </p>

                <div className="flex items-center gap-3 pt-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover bg-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-xs text-neutral-400 font-medium">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving to Right */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee-right gap-6 pr-6">
            {row2Duplicated.map((item, index) => (
              <div
                key={`row2-${item.id}-${index}`}
                className="w-[340px] bg-white p-7 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-[190px] shrink-0 hover:shadow-md transition-shadow"
              >
                <p className="text-neutral-700 text-sm leading-relaxed font-normal">
                  {item.review}
                </p>

                <div className="flex items-center gap-3 pt-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover bg-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900 leading-tight">
                      {item.name}
                    </h4>
                    <span className="text-xs text-neutral-400 font-medium">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;