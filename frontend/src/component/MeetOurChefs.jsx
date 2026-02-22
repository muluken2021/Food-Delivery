import React from "react";
import { Instagram, Twitter, Linkedin, Award } from "lucide-react";

const MeetOurChefs = () => {
  const chefs = [
    {
      id: 1,
      name: "Chef Selam",
      role: "Executive Head Chef",
      bio: "Master of Ethiopian fusion, blending traditional spices with modern culinary art.",
      image: './chef1.jpg', 
      exp: "12+ Years"
    },
    {
      id: 2,
      name: "Chef Amanuel",
      role: "Senior Pastry Chef",
      bio: "Crafting visually stunning desserts that tell a story in every single bite.",
      image: './chef2.jpg',
      exp: "8+ Years"
    },
    {
      id: 3,
      name: "Chef Hana",
      role: "Culinary Director",
      bio: "Expert in sustainable sourcing and perfecting main courses with fresh techniques.",
      image: './chef3.jpg',
      exp: "10+ Years"
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-brand-500"></div>
            <span className="text-brand-500 font-bold tracking-[0.2em] uppercase text-sm">The Artisans</span>
            <div className="h-[2px] w-12 bg-brand-500"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">Master Chefs</span>
          </h2>
          
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            The secret ingredient is always passion. Our award-winning team works 
            tirelessly to bring gourmet experiences straight to your table.
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-10">
          {chefs.map((chef) => (
            <div key={chef.id} className="group relative">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with Socials */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-10">
                  <div className="flex gap-4">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <button key={i} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-brand-500 transition-colors">
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="absolute top-6 right-6 bg-white/90 px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl">
                  <Award size={14} className="text-brand-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                    {chef.exp}
                  </span>
                </div>
              </div>

              {/* Content Box */}
              <div className="text-center px-4">
                <h3 className="text-2xl font-black mb-2 transition-colors group-hover:text-brand-500 text-gray-900">
                  {chef.name}
                </h3>
                <p className="text-brand-500 font-bold text-sm tracking-widest uppercase mb-4">
                  {chef.role}
                </p>
                <div className="h-[1px] w-12 bg-brand-500/30 mx-auto mb-4"></div>
                <p className="text-sm leading-relaxed italic text-gray-600">
                  "{chef.bio}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurChefs;