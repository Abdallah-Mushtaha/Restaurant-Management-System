import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "../api/axios";
import DashboardLayout from "../Components/DashboardLayout";
import CompletedCard from "../Components/KitchenDashboard/CompletedCard";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Search, History, Loader2 } from "lucide-react";

export default function CompletedOrders() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", "completed"],
    queryFn: ordersApi.getAll,
    select: (data) =>
      data.filter((o: any) => o.status === "completed" || o.status === "ready"),
    refetchInterval: 30000,
  });

  return (
    <DashboardLayout
      title="سجل الطلبات"
      subtitle="مراجعة الطلبات التي تم إنجازها اليوم"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-500 rounded-[1.5rem] text-white shadow-xl shadow-emerald-100">
            <CheckCheck size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 leading-none">
              الإنجازات
            </h2>
            <p className="text-emerald-500 font-bold text-sm mt-1">
              {orders.length} طلب مكتمل اليوم
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 right-4 flex items-center text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="بحث برقم الطاولة أو الطلب..."
            className="pr-12 pl-6 py-4 bg-white border border-gray-100 rounded-[1.5rem] w-full md:w-80 shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-500" size={40} />
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <History size={60} className="text-gray-200 mb-4" />
          <p className="text-gray-400 font-black">
            لا يوجد سجل للطلبات حتى الآن
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {orders.map((order: any) => (
              <CompletedCard key={order.id} order={order} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
}
