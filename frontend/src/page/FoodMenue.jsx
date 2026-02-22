import React, { useState, useEffect } from 'react';
import Fooditems from '../component/Fooditems';
import { 
  Search, 
  X, 
  UtensilsCrossed, 
  SlidersHorizontal 
} from 'lucide-react';

const FoodMenue = () => {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = ["All", "Pizza", "pasta", "burgers_sandwiches", "desserts", "Drinks"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100">
      
      {/* 1. Minimalist Hero Header */}
      <header className="pt-22 pb-1 px-6 lg:px-24">
        <div className="max-w-4xl  text-start space-y-6">
          
          
          <h1 className="text-3xl md:text-5xl font-black/30 text-slate-900 tracking-tight">
            Our <span className="text-brand-500">Menu</span>
          </h1>
          
          <p className="text-slate-500 text-md md:text-lg max-w-xl  leading-relaxed">
            Freshly prepared meals delivered to your door. Filter by category to find your favorite dish.
          </p>

        
        </div>
      </header>

      {/* 2. Seamless Sticky Search & Filter Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-4 shadow-sm' 
          : 'bg-transparent py-8'
      }`}>
       
        <div className="md:flex justify-between px-6 lg:px-24 space-y-6">

          {/* Category Filter Pills */}
          <div className="flex items-center  gap-2 overflow-x-auto no-scrollbar pt-0">
            
            <div className="flex items-center gap-2 px-3 text-slate-400 border-r border-slate-200 hidden md:flex">
              <SlidersHorizontal size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
            </div>
             
            <div className="flex gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item.toLowerCase())}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    category === item.toLowerCase()
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="relative max-w-xl  w-full group ">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
            </div>
            
            <input
              type="text"
              placeholder="Search for your favorite dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-400 rounded-2xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand-500/5 focus:border-brand-500 transition-all text-sm md:text-base"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </nav>

      

      {/* 3. Main Content Area */}
      <main className="px-6 lg:px-24 py-12">
        
        {/* Search Feedback Context */}
        {searchQuery && (
          <div className="mb-12 flex items-center gap-4 text-slate-500 border-l-2 border-brand-500 pl-4 animate-in fade-in slide-in-from-left-4">
            <p className="text-sm italic">
              Showing results for <span className="text-slate-900 font-bold">"{searchQuery}"</span>
            </p>
            <button 
              onClick={() => setSearchQuery("")}
              className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="min-h-[400px]">
          <Fooditems category={category} searchQuery={searchQuery} />
        </div>
      </main>

      {/* Hide Scrollbar Style */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default FoodMenue;