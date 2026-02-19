import { useMemo, memo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../Components/DashboardLayout";
import { ordersApi } from "../api/axios";
import {
  CheckCircle2,
  AlertCircle,
  Flame,
  ArrowRight,
  User as UserIcon,
  Timer,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const OrderCard = memo(({ order, status, onUpdate, config }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className={`bg-white p-5 rounded-[2.2rem] border-2 shadow-sm group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 ${config.border} shrink-0 w-full`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col gap-1">
        <div className="bg-gradient-to-br from-gray-800 to-black text-white px-4 py-1.5 rounded-2xl text-[12px] font-black shadow-lg flex items-center gap-2 w-fit italic">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          طاولة {order.tableNumber}
        </div>
        <span className="text-[10px] font-mono text-gray-400 px-1">
          #{order.id.slice(-4)}
        </span>
      </div>
      <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl text-gray-400">
        <Timer size={12} />
        <span className="text-[10px] font-black">2 د</span>
      </div>
    </div>

    <div className="mb-5 space-y-2.5 max-h-[180px] overflow-y-auto pr-1 hide-scrollbar">
      {order.items.map((item: any, i: number) => (
        <div
          key={i}
          className="flex items-center justify-between bg-gray-50/80 p-3 rounded-[1.2rem] border border-gray-100 group-hover:bg-white group-hover:border-orange-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-black text-orange-600 bg-white w-7 h-7 flex items-center justify-center rounded-xl shadow-sm border border-orange-50">
              {item.quantity}
            </span>
            <span className="text-xs font-bold text-gray-700">{item.name}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2 text-gray-400 mb-5 px-1 border-t border-dashed border-gray-100 pt-4">
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <UserIcon size={12} className="text-gray-500" />
      </div>
      <span className="text-[11px] font-black truncate">
        {order.guestName || "عميل محلي"}
      </span>
    </div>

    <button
      onClick={() => onUpdate(order.id, status)}
      className="w-full py-4 rounded-[1.5rem] text-[12px] font-black flex items-center justify-center gap-3 transition-all active:scale-95 bg-gray-900 text-white hover:bg-orange-600 shadow-lg shadow-gray-200 hover:shadow-orange-200"
    >
      <span>{status === "ready" ? "إتمام الطلب" : "بدء التجهيز"}</span>
      <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-[-4px]" />
    </button>
  </motion.div>
));

export default function KitchenDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getAll,
    refetchInterval: 3000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("تم نقل الطلب بنجاح");
    },
  });

  const handleStatusUpdate = (id: string, currentStatus: string) => {
    const next = STATUS_STEPS[STATUS_STEPS.indexOf(currentStatus) + 1];
    updateStatusMutation.mutate({ id, status: next });
  };

  const STATUS_CONFIG: any = {
    pending: {
      label: "جديد",
      color: "rose",
      badge: "bg-rose-600",
      lightBg: "bg-rose-50",
      iconColor: "text-rose-600",
      icon: AlertCircle,
      border: "border-rose-100",
    },
    received: {
      label: "استلام",
      color: "blue",
      badge: "bg-blue-600",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: ShoppingBag,
      border: "border-blue-100",
    },
    preparing: {
      label: "طهي",
      color: "orange",
      badge: "bg-orange-600",
      lightBg: "bg-orange-50",
      iconColor: "text-orange-600",
      icon: Flame,
      border: "border-orange-100",
    },
    ready: {
      label: "جاهز",
      color: "green",
      badge: "bg-green-600",
      lightBg: "bg-green-50",
      iconColor: "text-green-600",
      icon: CheckCircle2,
      border: "border-green-100",
    },
  };
  const STATUS_STEPS = [
    "pending",
    "received",
    "preparing",
    "ready",
    "completed",
  ];

  return (
    <DashboardLayout
      title="إدارة العمليات"
      subtitle="متابعة فورية للمطبخ"
      onLogout={onLogout}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="h-[calc(100vh-180px)] overflow-hidden">
        <div className="flex lg:grid lg:grid-cols-4 gap-6 h-full overflow-x-auto lg:overflow-x-hidden pb-8 lg:pb-0 hide-scrollbar snap-x snap-mandatory px-2">
          {STATUS_STEPS.filter((s) => s !== "completed").map((status) => {
            const config = STATUS_CONFIG[status];
            const columnOrders = orders.filter((o: any) => o.status === status);

            return (
              <div
                key={status}
                className="flex flex-col h-full min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center"
              >
                <div className="flex items-center justify-between px-5 mb-5 bg-white py-4 rounded-[1.8rem] border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl bg-${config.color}-50 text-${config.color}-600`}
                    >
                      <config.icon size={18} />
                    </div>
                    <h3 className="font-black text-gray-800 text-[13px] uppercase tracking-wider">
                      {config.label}
                    </h3>
                  </div>
                  <span
                    className={`bg-${config.color}-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg shadow-${config.color}-100`}
                  >
                    {columnOrders.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-5 px-1 pb-10 hide-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {columnOrders.length > 0 ? (
                      columnOrders.map((order: any) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          status={status}
                          onUpdate={handleStatusUpdate}
                          config={config}
                        />
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-gray-50/50"
                      >
                        <span className="text-[10px] font-bold text-gray-400">
                          لا توجد طلبات
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
