import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export const FloatingCart = ({ totalItems, totalPrice, onClick }: any) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="fixed bottom-6 left-4 right-4 z-50 flex justify-center"
  >
    <button
      onClick={onClick}
      className="w-full max-w-[500px] bg-white h-16 md:h-20 rounded-[2rem] shadow-2xl flex items-center justify-between px-6 border border-orange-100 active:scale-95 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <div className="text-right">
          <p className="text-[8px] text-gray-400 font-black">سلة الطلبات</p>
          <p className="text-lg font-black text-gray-800">
            {totalPrice} <span className="text-xs text-orange-600">ج.م</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl font-black text-xs">
        <span>تأكيد الطلب</span>
        <ArrowLeft className="w-4 h-4" />
      </div>
    </button>
  </motion.div>
);
