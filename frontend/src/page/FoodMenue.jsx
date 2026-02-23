import React, { useState, useEffect } from 'react';
import Fooditems from '../component/Fooditems';
import { 
  Search, 
  X, 
  SlidersHorizontal 
} from 'lucide-react';

const FoodMenue = () => {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = ["All", "Pizza", "Pasta", "Burgers", "Desserts", "Drinks"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Hero Header */}
      <header className="py-20 pb-8 px-6 lg:px-24">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 tracking-tight">
            Our <span className="text-brand-500">Menu</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
            Freshly prepared meals delivered to your door. Filter by category to find your favorite dish.
          </p>
        </div>
      </header>

      {/* 2. Sticky Search & Filter - ADJUSTED TOP VALUE */}
      <nav 
        className={`sticky z-40 transition-all duration-300 ${
          isScrolled 
            ? 'top-[60px] bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' 
            : 'top-0 bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Category Filter Pills */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
              <div className="hidden md:flex items-center gap-2 pr-4 border-r border-slate-200 text-slate-400">
                <SlidersHorizontal size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Filter</span>
              </div>
               
              <div className="flex gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item.toLowerCase())}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                      category === item.toLowerCase()
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:max-w-xs lg:max-w-md group">
              <Search 
                size={18} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" 
              />
              <input
                type="text"
                placeholder="Find a dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* 3. Main Content Area */}
      <main className="px-6 lg:px-24 py-12">
        {searchQuery && (
          <div className="mb-8 flex items-center gap-3 text-slate-500 animate-in fade-in duration-500">
            <span className="w-1 h-6 bg-brand-500 rounded-full" />
            <p className="text-sm">
              Showing results for <span className="text-slate-900 font-bold italic">"{searchQuery}"</span>
            </p>
          </div>
        )}

        <div className="min-h-[400px]">
          
          <Fooditems category={category} searchQuery={searchQuery} />
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default FoodMenue;