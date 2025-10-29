import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import chef1 from "../assets/chef1.png"; // transparent images recommended
import chef2 from "../assets/chef2.jpg";
import chef3 from "../assets/chef3.jpg";

const MeetOurChefs = () => {
  const { theme } = useContext(ThemeContext);

  const chefs = [
    {
      id: 1,
      name: "Chef Amanuel",
      role: "Head Chef",
      bio: "Specializes in Ethiopian and fusion cuisine, crafting flavors that delight.",
      image: chef1,
    },
    {
      id: 2,
      name: "Chef Selam",
      role: "Pastry Chef",
      bio: "Expert in desserts and pastries, creating visually stunning and tasty treats.",
      image: chef2,
    },
    {
      id: 3,
      name: "Chef Daniel",
      role: "Sous Chef",
      bio: "Focused on perfecting main courses with fresh ingredients and modern techniques.",
      image: chef3,
    },
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c]" : "bg-gray-50"
      }`}
    >
      <div className="text-center mb-12">
  <h2
    className={`text-3xl sm:text-4xl font-extrabold mb-4 relative inline-block ${
      theme === "dark" ? "text-white" : "text-gray-700"
    }`}
  >
   Meet Our Chefs
  </h2>
  {/* Decorative lines with circle */}
  <div className="flex items-center justify-center gap-2 mb-4">
    <span className={`h-[4px] w-36 ${theme === "dark" ? "bg-[#e58d00]" : "bg-[#e58d00]"}`}></span>
    <span className={`h-5 w-5 rounded-full ${theme === "dark" ? "bg-[#e58d00]" : "bg-[#e58d00]"}`}></span>
    <span className={`h-[4px] w-36 ${theme === "dark" ? "bg-[#e58d00]" : "bg-[#e58d00]"}`}></span>
  </div>
  <p
    className={`text-base sm:text-lg ${
      theme === "dark" ? "text-white/80" : "text-gray-600"
    }`}
  >
    Passionate, talented, and dedicated chefs bringing your favorite meals to life.
  </p>
</div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className={`
              group text-center transition-transform transform hover:scale-105
              border-2 border-transparent rounded-xl overflow-hidden
              ${theme === "dark" ? "bg-[#141414]" : "bg-white"}
              hover:border-yellow-300 shadow-lg hover:shadow-2xl
            `}
          >
            <div className="relative flex justify-center">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-48 object-cover transition-all duration-300"
              />
            </div>
            <div className="p-5">
              <h3
                className={`text-xl font-semibold mb-1 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {chef.name}
              </h3>
              <p
                className={`text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-[#e58d00]" : "text-[#e58d00]"
                }`}
              >
                {chef.role}
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {chef.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurChefs;
