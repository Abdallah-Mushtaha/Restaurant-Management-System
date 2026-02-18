import { useCartStore } from "../store/useCartStore";
import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { orderService } from "../api/axios";

export default function CartPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const guestInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("guest") || "{}");
    } catch {
      return {};
    }
  }, []);

  const guestId = guestInfo?.id;

  const allCartItems = useCartStore((state: any) => state.cartItems);
  const clearGuestCart = useCartStore((state: any) => state.clearGuestCart);
  const updateQuantity = useCartStore((state: any) => state.updateQuantity);
  const removeFromCart = useCartStore((state: any) => state.removeFromCart);

  const cartItems = useMemo(() => {
    if (!guestId) return [];
    return allCartItems.filter((i: any) => i.guestId === guestId);
  }, [allCartItems, guestId]);

  const totalPrice = useCartStore((state: any) => state.getTotalPrice(guestId));

  const handleConfirmOrder = async () => {
    if (!guestId || cartItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);

    const orderData = {
      id: `ORD-${Math.random().toString(36).toUpperCase().substr(2, 7)}`,
      visitId: guestId,
      guestName: guestInfo?.guestName,
      tableNumber: guestInfo?.tableNumber,
      items: cartItems.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await orderService.createOrder(orderData);
      clearGuestCart(guestId);
      navigate("/menu");
    } catch (error) {
      alert("خطأ في إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0)
    return (
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
            onClick={() => navigate("/menu")}
            className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95 cursor-pointer"
          >
            تصفح القائمة الآن
          </button>
        </motion.div>
      </div>
    );

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAFBFF] pb-44 text-gray-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-gray-50">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 active:scale-90 transition-transform cursor-pointer"
        >
          <ChevronRight className="text-gray-600" />
        </button>
        <h1 className="text-xl font-black tracking-tight">سلة الطلبات</h1>
        <div className="w-12 h-12" />
      </header>

      <main className="p-6 space-y-6">
        <AnimatePresence>
          {cartItems.map((item: any) => (
            <motion.div
              key={`${item.id}-${guestId}`}
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
                    onClick={() => removeFromCart(item.id, guestId)}
                    className="p-2 text-gray-300 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-black text-xl text-orange-600">
                      {item.price * item.quantity}{" "}
                      <small className="text-xs font-bold">ج.م</small>
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, -1, guestId)}
                      className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 hover:text-orange-600"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-black w-10 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1, guestId)}
                      className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

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
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="w-full bg-gray-900 text-white py-5 rounded-[2.2rem] font-black text-lg flex items-center justify-center gap-3 relative disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "تأكيد الطلب الآن"
            )}
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
