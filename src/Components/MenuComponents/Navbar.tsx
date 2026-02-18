import { ShoppingBag, MapPin, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MenuNavbar = ({ guestInfo, totalItems, onCartClick }: any) => {
  const navigate = useNavigate();

  return (
    <nav className="px-4 md:px-6 py-5 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-50">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="w-10 h-10 md:w-11 md:h-11 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 text-white">
          <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h1 className="font-black text-lg md:text-xl tracking-tighter text-gray-800">
            مطعم<span className="text-orange-600">نا</span>
          </h1>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-400 font-bold">
              طاولة {guestInfo?.tableNumber || "0"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-left ml-2 hidden sm:block">
          <p className="text-[10px] text-gray-400 font-bold leading-none">
            أهلاً بك
          </p>
          <p className="text-sm font-black text-gray-800">
            {guestInfo?.guestName || "ضيفنا"}
          </p>
        </div>
        <button
          onClick={onCartClick}
          className="relative p-3 bg-orange-50 rounded-2xl transition-transform cursor-pointer active:scale-90"
        >
          <ShoppingBag className="w-6 h-6 text-orange-600" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
