import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const CartFooter = ({ totalPrice, isSubmitting, onConfirm }: any) => (
  <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl p-8 rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.04)] border-t border-gray-50/50">
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <p className="text-gray-400 text-xs font-bold uppercase mb-1">
            المبلغ الإجمالي
          </p>
          <h2 className="text-3xl font-black text-gray-900">
            {totalPrice.toLocaleString()}{" "}
            <span className="text-sm font-bold text-orange-600">ج.م</span>
          </h2>
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-green-500">توصيل سريع 🚀</p>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onConfirm}
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white py-5 rounded-[2.2rem] font-black text-lg flex items-center justify-center gap-3 relative disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          "تأكيد الطلب الآن"
        )}
      </motion.button>
    </div>
  </footer>
);
