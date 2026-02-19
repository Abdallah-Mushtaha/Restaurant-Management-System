import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export const EmptyCart = ({ onBrowse }: { onBrowse: () => void }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#FAFBFF]"
    dir="rtl"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gray-100">
        <ShoppingBag className="w-12 h-12 text-gray-200" />
      </div>
      <h2 className="text-2xl font-black text-gray-800 mb-2">
        سلتك بانتظار أطباقك
      </h2>
      <p className="text-gray-400 mb-8 font-medium">
        لم تقم بإضافة أي شيء إلى سلة المشتريات بعد
      </p>
      <button
        onClick={onBrowse}
        className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 cursor-pointer"
      >
        تصفح القائمة الآن
      </button>
    </motion.div>
  </div>
);
