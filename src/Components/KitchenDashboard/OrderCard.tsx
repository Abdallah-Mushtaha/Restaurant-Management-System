import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, User, ArrowRight, Hash } from "lucide-react";

const OrderCard = memo(
  ({
    order,
    onMoveStatus,
  }: {
    order: any;
    onMoveStatus: (id: string) => void;
  }) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[2.5rem] p-6 border border-rose-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/20 transition-all group"
      >
        <div className="flex justify-between items-start mb-5">
          <div className="flex gap-3">
            <div className="bg-rose-600 text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-rose-200">
              <span className="text-[10px] font-black leading-none opacity-80">
                طاولة
              </span>
              <span className="text-xl font-black leading-none">
                {order.tableNumber}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-rose-500 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  طلب جديد
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px]">
                <Hash size={10} /> {order.id.slice(-6)}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-3 py-1.5 rounded-xl flex items-center gap-2 text-gray-500">
            <Timer size={14} />
            <span className="text-xs font-bold">منذ 2 د</span>
          </div>
        </div>

        <div className="space-y-3 mb-6 bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xs font-black text-gray-900 shadow-sm">
                  {item.quantity}
                </span>
                <span className="text-sm font-bold text-gray-700">
                  {item.name}
                </span>
              </div>
              {item.note && (
                <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-lg font-bold">
                  {item.note}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-dashed border-gray-100">
          <div className="flex items-center gap-2 text-gray-400">
            <User size={14} />
            <span className="text-xs font-bold">
              {order.guestName || "زائر"}
            </span>
          </div>
          <button
            onClick={() => onMoveStatus(order.id)}
            className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all active:scale-95"
          >
            بدء التحضير
            <ArrowRight size={14} className="rotate-180" />
          </button>
        </div>
      </motion.div>
    );
  },
);

export default OrderCard;
