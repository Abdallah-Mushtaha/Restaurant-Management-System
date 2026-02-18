import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Table2, Utensils, Loader2, ArrowRight } from "lucide-react";
import { useRegisterGuest } from "../hooks/Customer/useCustomer";
import { EntryInput } from "../Components/CustomerEntry/EntryInput";
import { StatusIndicator } from "../Components/CustomerEntry/StatusIndicator";

export default function CustomerEntry() {
  const [tableNumber, setTableNumber] = useState("");
  const [guestName, setGuestName] = useState("");
  const { mutate: register, isPending } = useRegisterGuest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      tableNumber: parseInt(tableNumber),
      guestName: guestName.trim() || `ضيف طاولة ${tableNumber}`,
      status: "active",
      entryTime: new Date().toISOString(),
    });
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white shadow-xl rounded-3xl mb-4 border border-orange-50">
            <ChefHat className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900">
            مطعم <span className="text-orange-600">الأصالة</span>
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl border border-white shadow-2xl rounded-[2.5rem] p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <EntryInput
              label="رقم الطاولة"
              Icon={Table2}
              type="number"
              placeholder="أدخل رقم الطاولة "
              required
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />

            <EntryInput
              label="الاسم (اختياري)"
              Icon={Utensils}
              type="text"
              placeholder="أدخل اسم الضيف"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />

            <button
              disabled={isPending}
              className="w-full h-16 bg-gray-900 hover:bg-orange-600 disabled:bg-gray-400 text-white rounded-2xl font-bold cursor-pointer text-lg transition-all shadow-lg flex items-center justify-center gap-3"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "دخول المنيو"
              )}
              {!isPending && <ArrowRight className="w-5 h-5 rotate-180" />}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase justify-center">
            <StatusIndicator color="bg-green-500" label="متاح" pulse />
            <StatusIndicator color="bg-red-500" label="محجوز" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
