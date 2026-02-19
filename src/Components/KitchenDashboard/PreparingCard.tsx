import { memo } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, CheckCircle2, User, Utensils } from "lucide-react";

const PreparingCard = memo(
  ({ order, onComplete }: { order: any; onComplete: (id: string) => void }) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[2.5rem] p-6 border border-orange-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/20 transition-all"
      >
        <div className="flex justify-between items-start mb-5">
          <div className="flex gap-3">
            <div className="bg-orange-500 text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-[10px] font-black opacity-80">طاولة</span>
              <span className="text-xl font-black">{order.tableNumber}</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-orange-600 mb-1">
                <Flame size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase italic">
                  قيد الطهي الآن
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold">
                <Clock size={12} />{" "}
                {new Date(order.updatedAt).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6 bg-orange-50/30 p-4 rounded-[2rem] border border-orange-100/50">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-xs font-black text-orange-600 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {item.quantity}
                </div>
                <span className="text-sm font-bold text-gray-700">
                  {item.name}
                </span>
              </div>
              <Utensils size={12} className="text-orange-200" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <User size={12} />
            </div>
            <span className="text-[10px] font-black">
              {order.guestName || "طلب محلي"}
            </span>
          </div>

          <button
            onClick={() => onComplete(order.id)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100"
          >
            جاهز للتسليم
            <CheckCircle2 size={14} />
          </button>
        </div>
      </motion.div>
    );
  },
);

export default PreparingCard;
