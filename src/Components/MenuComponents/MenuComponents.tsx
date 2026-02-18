import { Search, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ value, onChange }: any) => (
  <div className="relative mb-8">
    <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="ابحث عن طبقك المفضل..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-14 bg-gray-50 border-none rounded-2xl pr-14 pl-6 text-sm font-bold focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
    />
  </div>
);

export const CategoryBar = ({ categories, active, onSelect }: any) => (
  <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
    {categories.map((cat: string) => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={`px-7 cursor-pointer py-3.5 rounded-2xl whitespace-nowrap font-extrabold text-sm transition-all duration-300 ${
          active === cat
            ? "bg-orange-600 text-white shadow-xl shadow-orange-200"
            : "bg-white text-gray-400 border border-gray-100"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export const FloatingCart = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[450px] z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <div className="bg-gray-900/90 backdrop-blur-xl h-20 rounded-[2.5rem] shadow-2xl flex items-center justify-between px-6 md:px-8 border border-white/10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-white" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-900 font-black">
              {totalItems}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">
              المجموع
            </span>
            <span className="text-white font-black text-base md:text-lg leading-none">
              {totalPrice}{" "}
              <small className="text-[10px] text-orange-500 font-bold">
                ج.م
              </small>
            </span>
          </div>
        </div>

        <button
          className="bg-orange-600 cursor-pointer hover:bg-orange-500 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-2xl font-black text-xs md:text-sm active:scale-95 transition-all shadow-lg shadow-orange-900/40"
          onClick={() => navigate("/cart")}
        >
          إتمام الطلب
        </button>
      </div>
    </div>
  );
};
