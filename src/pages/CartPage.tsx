import { useCartStore } from "../store/useCartStore";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState, useCallback } from "react";
import { orderService } from "../api/axios";
import { EmptyCart } from "../Components/Cart/EmptyCart";
import { CartItem } from "../Components/Cart/CartItem";
import { CartFooter } from "../Components/Cart/CartFooter";

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
  const totalPrice = useCartStore((state: any) => state.getTotalPrice(guestId));

  const cartItems = useMemo(() => {
    if (!guestId) return [];
    return allCartItems.filter((i: any) => i.guestId === guestId);
  }, [allCartItems, guestId]);

  const handleConfirmOrder = useCallback(async () => {
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
  }, [
    guestId,
    cartItems,
    totalPrice,
    guestInfo,
    clearGuestCart,
    navigate,
    isSubmitting,
  ]);

  if (cartItems.length === 0)
    return <EmptyCart onBrowse={() => navigate("/menu")} />;

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
            <CartItem
              key={`${item.id}-${guestId}`}
              item={item}
              guestId={guestId}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </AnimatePresence>
      </main>

      <CartFooter
        totalPrice={totalPrice}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
