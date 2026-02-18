import { Search } from "lucide-react";

export const MenuFilters = ({
  searchQuery,
  setSearchQuery,
  categories,
  activeCategory,
  setActiveCategory,
}: any) => (
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center mb-10 scroll-mt-24">
    <div className="relative w-full md:flex-1">
      <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
      <input
        type="text"
        placeholder="ابحث عن أكلتك المفضلة..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-14 bg-gray-50 border-2 border-transparent rounded-[1.25rem] pr-14 pl-6 font-bold focus:bg-white focus:border-orange-500/20 outline-none shadow-inner"
      />
    </div>

    <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
      <div className="flex gap-2 pb-2">
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-xl whitespace-nowrap font-black text-[10px] md:text-xs transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-orange-600 text-white shadow-xl"
                : "bg-white text-gray-400 border border-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  </div>
);
