import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, User as UserIcon, ArrowRight } from "lucide-react";

export const OrderCard = memo(({ order, status, onUpdate, config }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className={`bg-white p-5 rounded-[2.2rem] border-2 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 ${config.border} shrink-0 w-full`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col gap-1">
        <div className="bg-gradient-to-br from-gray-800 to-black text-white px-4 py-1.5 rounded-2xl text-[12px] font-black shadow-lg flex items-center gap-2 w-fit italic">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          طاولة {order.tableNumber}
        </div>
        <span className="text-[10px] font-mono text-gray-400 px-1">
          #{order.id.slice(-4)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl text-gray-400">
        <Timer size={12} />
        <span className="text-[10px] font-black">2 د</span>
      </div>
    </div>

    <div className="mb-5 space-y-2.5 max-h-[180px] overflow-y-auto pr-1 hide-scrollbar">
      {order.items.map((item: any, i: number) => (
        <div
          key={i}
          className="flex items-center justify-between bg-gray-50/80 p-3 rounded-[1.2rem] border border-gray-100 group-hover:bg-white group-hover:border-orange-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-black text-orange-600 bg-white w-7 h-7 flex items-center justify-center rounded-xl shadow-sm border border-orange-50">
              {item.quantity}
            </span>
            <span className="text-xs font-bold text-gray-700">{item.name}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2 text-gray-400 mb-5 px-1 border-t border-dashed border-gray-100 pt-4">
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <UserIcon size={12} className="text-gray-500" />
      </div>
      <span className="text-[11px] font-black truncate">
        {order.guestName || "عميل محلي"}
      </span>
    </div>

    <button
      onClick={() => onUpdate(order.id, status)}
      className="w-full py-4 rounded-[1.5rem] text-[12px] font-black flex items-center justify-center gap-3 transition-all active:scale-95 bg-gray-900 text-white hover:bg-orange-600 shadow-lg shadow-gray-200"
    >
      <span>{status === "ready" ? "إتمام الطلب" : "بدء التجهيز"}</span>
      <ArrowRight className="w-4 h-4 rotate-180" />
    </button>
  </motion.div>
));
