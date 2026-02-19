import React from "react";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus } from "lucide-react";

export const CartItem = React.memo(
  ({ item, guestId, onRemove, onUpdateQuantity }: any) => (
    <motion.div
      layout
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="bg-white p-4 rounded-[2.5rem] flex gap-5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 relative group"
    >
      <div className="relative w-28 h-28 shrink-0">
        <img
          src={item.image}
          className="w-full h-full rounded-[1.8rem] object-cover shadow-md"
          alt={item.name}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-black text-gray-800 text-lg mb-1">
              {item.name}
            </h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
              {item.category}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id, guestId)}
            className="p-2 text-gray-300 hover:text-red-500 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="flex justify-between items-end">
          <span className="font-black text-xl text-orange-600">
            {item.price * item.quantity}{" "}
            <small className="text-xs font-bold">ج.م</small>
          </span>
          <div className="flex items-center bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
            <button
              onClick={() => onUpdateQuantity(item.id, -1, guestId)}
              className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 hover:text-orange-600"
            >
              <Minus size={14} />
            </button>
            <span className="font-black w-10 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1, guestId)}
              className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center text-white"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  ),
);
