import { ShoppingBag, MapPin, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ordersApi } from "../../api/axios";
import { OrderNotifications } from "./OrderNotifications";

export const MenuNavbar = ({ guestInfo, totalItems, onCartClick }: any) => {
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!guestInfo?.id) return;

    const fetchMyOrders = async () => {
      try {
        const orders = await ordersApi.getByVisitId(guestInfo.id);
        setMyOrders(orders);
      } catch {
        setMyOrders([]);
      }
    };

    fetchMyOrders();
    const interval = setInterval(fetchMyOrders, 2000);
    return () => clearInterval(interval);
  }, [guestInfo?.id]);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-50 px-4"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto h-20 md:h-24 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 md:w-11 md:h-11 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
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

        <div className="flex items-center gap-3">
          <OrderNotifications orders={myOrders} />
          <button
            onClick={onCartClick}
            className="relative p-3 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all active:scale-95"
          >
            <ShoppingBag className="w-6 h-6 text-orange-600" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <div className="text-right hidden sm:block mr-1">
            <p className="text-[9px] text-gray-400 font-bold leading-none uppercase">
              أهلاً بك
            </p>
            <p className="text-sm font-black text-gray-800">
              {guestInfo?.guestName || "ضيفنا"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
