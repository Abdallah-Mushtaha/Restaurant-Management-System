import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/axios";
import DashboardLayout from "../Components/DashboardLayout";
import PreparingCard from "../Components/KitchenDashboard/PreparingCard";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PreparingOrders() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", "preparing"],
    queryFn: ordersApi.getAll,
    select: (data) =>
      data.filter(
        (o: any) => o.status === "preparing" || o.status === "received",
      ),
    refetchInterval: 5000,
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => ordersApi.updateStatus(id, "ready"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("تم نقل الطلب لمنطقة التسليم", {
        icon: "🚀",
        style: { borderRadius: "20px", fontWeight: "bold" },
      });
    },
  });

  const handleComplete = useCallback(
    (id: string) => {
      completeMutation.mutate(id);
    },
    [completeMutation],
  );

  return (
    <DashboardLayout
      title="منطقة الطهي"
      subtitle="الطلبات التي يتم تجهيزها الآن"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-orange-500 rounded-[1.5rem] text-white shadow-xl shadow-orange-200">
          <Flame
            size={32}
            className={orders.length > 0 ? "animate-bounce" : ""}
          />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 leading-none">
            تحت التنفيذ
          </h2>
          <p className="text-orange-500 font-bold text-sm mt-1">
            {orders.length} أصناف نشطة
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-orange-500" size={40} />
        </div>
      ) : orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-[3rem] p-20 flex flex-col items-center border-2 border-dashed border-gray-100"
        >
          <div className="text-6xl mb-4">👨‍🍳</div>
          <h3 className="text-xl font-black text-gray-400">
            المطبخ هادئ حالياً.. لا توجد طلبات
          </h3>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {orders.map((order: any) => (
              <PreparingCard
                key={order.id}
                order={order}
                onComplete={handleComplete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
}
