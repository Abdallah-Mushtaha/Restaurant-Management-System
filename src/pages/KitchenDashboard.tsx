import { useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../Components/DashboardLayout";
import { ordersApi } from "../api/axios";
import { CheckCircle2, AlertCircle, Flame, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { StatusColumn } from "../Components/KitchenDashboard/StatusColumn";

export default function KitchenDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const queryClient = useQueryClient();

  const { STATUS_CONFIG, STATUS_STEPS } = useMemo(
    () => ({
      STATUS_CONFIG: {
        pending: {
          label: "جديد",
          color: "rose",
          icon: AlertCircle,
          border: "border-rose-100",
        },
        received: {
          label: "استلام",
          color: "blue",
          icon: ShoppingBag,
          border: "border-blue-100",
        },
        preparing: {
          label: "طهي",
          color: "orange",
          icon: Flame,
          border: "border-orange-100",
        },
        ready: {
          label: "جاهز",
          color: "green",
          icon: CheckCircle2,
          border: "border-green-100",
        },
      },
      STATUS_STEPS: ["pending", "received", "preparing", "ready", "completed"],
    }),
    [],
  );

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

  const handleStatusUpdate = useCallback(
    (id: string, currentStatus: string) => {
      const next = STATUS_STEPS[STATUS_STEPS.indexOf(currentStatus) + 1];
      if (next) updateStatusMutation.mutate({ id, status: next });
    },
    [STATUS_STEPS, updateStatusMutation],
  );

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
          {STATUS_STEPS.filter((s) => s !== "completed").map((status) => (
            <StatusColumn
              key={status}
              status={status}
              config={STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]}
              orders={orders.filter((o: any) => o.status === status)}
              onUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
