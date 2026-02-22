import React from "react";
import { Quote, Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Abel Abera",
    role: "Food Enthusiast",
    review: "The Kitfo was spectacular. You can taste the authenticity in every bite. Easily the fastest delivery I've had in the city!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Sara T.",
    role: "Regular Customer",
    review: "DashDine has changed my lunch game. The interface is so smooth, and the food always arrives steaming hot. 10/10!",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
  {
    name: "Daniel H.",
    role: "Local Foodie",
    review: "Finally, a delivery service that cares about presentation! The modern meals are as beautiful as they are delicious.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Decorative Background Quote */}
      <Quote className="absolute top-10 right-10 w-64 h-64 opacity-[0.03] rotate-12 pointer-events-none text-gray-900" />

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-brand-500"></span>
              <span className="text-brand-500 font-bold tracking-widest uppercase text-xs">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              What Our <span className=" bg-clip-text bg-gradient-to-r text-brand-500 ">Foodies</span> Are Saying
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-4 p-4 rounded-2xl border bg-white border-gray-200 text-gray-600">
            <div className="flex -space-x-3">
              {testimonials.map((t, i) => (
                <img key={i} src={t.avatar} className="w-10 h-10 rounded-full border-2 border-brand-500" alt="" />
              ))}
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs font-bold">+2k</div>
            </div>
            <p className="text-sm font-medium">Join 2,000+ happy diners</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-[2rem] border bg-white border-gray-100 shadow-xl shadow-gray-200/40 hover:border-brand-500/30 transition-all duration-500 hover:-translate-y-2 ${index === 1 ? "lg:translate-y-6" : ""}`}
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={`${i < t.rating ? "text-brand-500 fill-brand-500" : "text-gray-300"}`} 
                  />
                ))}
              </div>

              <p className="text-lg italic leading-relaxed mb-8 text-gray-700">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white p-1 rounded-full border-2 border-white">
                    <BadgeCheck size={12} />
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-base text-gray-900">{t.name}</h4>
                  <p className="text-brand-500 text-xs font-bold uppercase tracking-wider">{t.role}</p>
                </div>
              </div>

              {/* Decorative Corner Quote */}
              <Quote className="absolute top-8 right-8 w-8 h-8 opacity-10 group-hover:opacity-30 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;