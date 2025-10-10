import React from "react";
import { menu_list } from "../assets/assets";

const Menu = ({ category, setcatagory }) => {
  return (
    <section className="sm:mx-24 my-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
          Explore Our Menu
        </h1>
        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          Discover a variety of delicious meals crafted to satisfy every craving. From fresh, healthy options to indulgent treats, our menu offers something for everyone. Browse, choose, and enjoy your favorite dishes delivered right to your door.
        </p>
      </div>

      {/* Horizontal Scroll Menu */}
      <div className="mt-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 justify-center w-max mx-auto pb-4">
          {menu_list.map((menu, index) => (
            <div
              key={index}
              onClick={() =>
                setcatagory((prev) =>
                  prev === menu.value ? "All" : menu.value
                )
              }
              className="flex flex-col items-center cursor-pointer flex-shrink-0 group"
            >
              <img
                src={menu.menu_image}
                alt={menu.value}
                className={`w-28 h-28 object-cover rounded-full border-4 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg ${
                  category === menu.value
                    ? "border-yellow-500 scale-110 shadow-md"
                    : "border-gray-200"
                }`}
              />
              <h2
                className={`mt-3 text-sm font-medium ${
                  category === menu.value
                    ? "text-yellow-500"
                    : "text-gray-700"
                }`}
              >
                {menu.menu_name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
