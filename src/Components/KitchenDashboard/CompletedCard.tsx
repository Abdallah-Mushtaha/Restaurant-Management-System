import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Calendar, User, History } from "lucide-react";

const CompletedCard = memo(({ order }: { order: any }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2.5rem] p-6 border border-emerald-50 shadow-sm relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />

      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex gap-3">
          <div className="bg-emerald-500 text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-emerald-100">
            <span className="text-[10px] font-black opacity-80">طاولة</span>
            <span className="text-xl font-black">{order.tableNumber}</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-emerald-600 mb-1">
              <CheckCircle size={14} />
              <span className="text-[10px] font-black uppercase">
                تم التسليم بنجاح
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold">
              <Calendar size={12} />{" "}
              {new Date(order.updatedAt).toLocaleDateString("ar-EG")}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6 bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100/50 relative z-10">
        {order.items.map((item: any, idx: number) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b border-white last:border-0 pb-1"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-emerald-600 italic">
                x{item.quantity}
              </span>
              <span className="text-sm font-bold text-gray-500 line-through decoration-gray-300 decoration-2">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto px-1">
        <div className="flex items-center gap-2 text-gray-400">
          <User size={12} />
          <span className="text-[10px] font-black">
            {order.guestName || "عميل خارجي"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-xl text-gray-500">
          <Clock size={12} />
          <span className="text-[10px] font-black italic">
            {new Date(order.updatedAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default CompletedCard;
