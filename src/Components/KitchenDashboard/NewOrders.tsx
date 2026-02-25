import { useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../../api/axios";
import DashboardLayout from "../DashboardLayout";
import { OrderCard } from "./OrderCard";
import { AnimatePresence } from "framer-motion";
import { Inbox, RefreshCw } from "lucide-react";

export default function NewOrders() {
  const queryClient = useQueryClient();

  const {
    data: orders = [],
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["orders", "pending"],
    queryFn: ordersApi.getAll,
    select: (data) => data.filter((o: any) => o.status === "pending"),
    refetchInterval: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (id: string) => ordersApi.updateStatus(id, "received"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleMoveStatus = useCallback(
    (id: string) => {
      updateStatusMutation.mutate(id);
    },
    [updateStatusMutation],
  );

  return (
    <DashboardLayout
      title="الطلبات الجديدة"
      subtitle="إدارة الطلبات الواردة فوراً"
    >
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-black text-gray-900 leading-none">
            الواردة
          </h2>
          <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-black animate-pulse">
            {orders.length} طلبات
          </span>
        </div>
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["orders"] })
          }
          className={`p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 transition-all ${isRefetching && "animate-spin"}`}
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {orders.length === 0 && !isLoading ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-gray-300">
          <div className="w-24 h-24 bg-gray-50 rounded-[3rem] flex items-center justify-center mb-4">
            <Inbox size={40} />
          </div>
          <p className="font-bold">لا توجد طلبات جديدة حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {orders.map((order: any) => (
              <OrderCard
                key={order.id}
                order={order}
                status="pending"
                onUpdate={handleMoveStatus}
                config={{ border: "border-rose-100" }}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </DashboardLayout>
  );
}
