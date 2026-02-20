import { useState } from "react";
import {
  Bell,
  Clock,
  CheckCircle2,
  Flame,
  Utensils,
  PackageCheck,
} from "lucide-react";

export const OrderNotifications = ({ orders }: { orders: any[] }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getStatusDetails = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "قيد الانتظار",
          color: "text-gray-500 bg-gray-100",
          icon: Clock,
        };
      case "received":
        return {
          label: "تم الاستلام",
          color: "text-blue-600 bg-blue-50",
          icon: Utensils,
        };
      case "preparing":
        return {
          label: "قيد الطهي",
          color: "text-orange-600 bg-orange-50",
          icon: Flame,
        };
      case "ready":
        return {
          label: "جاهز للتسليم",
          color: "text-purple-600 bg-purple-50",
          icon: PackageCheck,
        };
      case "delivered":
      case "completed":
        return {
          label: "تم تنزيله للطاولة",
          color: "text-green-600 bg-green-50",
          icon: CheckCircle2,
        };
      default:
        return {
          label: "قيد الانتظار",
          color: "text-gray-500 bg-gray-100",
          icon: Clock,
        };
    }
  };

  const hasActiveOrders = orders.some(
    (o) => o.status !== "delivered" && o.status !== "completed",
  );

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all relative"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {hasActiveOrders && (
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute left-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 z-[60] animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="px-5 mb-3 text-right">
            <h3 className="font-black text-base text-gray-800">تتبع طلباتك</h3>
            <p className="text-[10px] text-gray-400 font-bold italic">
              حالة الاوردر في المطبخ
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto px-2 text-right">
            {orders.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-gray-400 font-bold">
                  لا يوجد طلبات حالياً
                </p>
              </div>
            ) : (
              [...orders].reverse().map((order) => {
                const details = getStatusDetails(order.status);
                return (
                  <div
                    key={order.id}
                    className={`mb-2 p-3 rounded-2xl border transition-all ${
                      order.status === "ready"
                        ? "border-purple-100 bg-purple-50/30"
                        : "border-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-bold text-gray-300 tracking-widest uppercase">
                        #
                        {typeof order.id === "string"
                          ? order.id.split("-")[1] || order.id.slice(-4)
                          : order.id}
                      </span>
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black ${details.color}`}
                      >
                        <details.icon
                          className={`w-3.5 h-3.5 ${
                            order.status === "cooking" ? "animate-bounce" : ""
                          }`}
                        />
                        {details.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1 h-6 rounded-full ${
                          order.status === "delivered" ||
                          order.status === "completed"
                            ? "bg-green-200"
                            : "bg-orange-200"
                        }`}
                      ></div>
                      <p className="text-xs font-bold text-gray-600 truncate">
                        {order.items?.map((i: any) => i.name).join(" ، ")}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
