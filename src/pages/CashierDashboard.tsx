import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../Components/DashboardLayout";
import { ordersApi, visitsApi } from "../api/axios";
import { toast } from "sonner";
import { StatsView } from "../Components/CashierDashboard/StatsView";
import { PendingOrderCard } from "../Components/CashierDashboard/PendingOrderCard";
import { CompletedOrderCard } from "../Components/CashierDashboard/CompletedOrderCard";
import { PrintInvoice } from "../Components/CashierDashboard/PrintInvoice";

export default function CashierDashboard({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"pending" | "completed" | "stats">(
    "pending",
  );
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<
    any | null
  >(null);

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await ordersApi.getAll();
      return Array.isArray(res) ? res : res.data;
    },
    refetchInterval: 3000,
  });

  const { data: visits = [] } = useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      const res = await visitsApi.getAll();
      return Array.isArray(res) ? res : res.data;
    },
    refetchInterval: 3000,
  });

  const processPaymentMutation = useMutation({
    mutationFn: async ({
      orderId,
      visitId,
    }: {
      orderId: string;
      visitId: string;
    }) => {
      await visitsApi.updateStatus(visitId, "inactive");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["visits"] });
      toast.success("تمت عملية الدفع وإغلاق الطاولة بنجاح");
    },
    onError: () => toast.error("حدث خطأ أثناء معالجة العملية"),
  });

  const pendingOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const visit = visits.find((v: any) => v.id === order.visitId);
      return order.status === "completed" && visit?.status === "active";
    });
  }, [orders, visits]);

  const completedOrders = useMemo(() => {
    return orders.filter((order: any) => {
      const visit = visits.find((v: any) => v.id === order.visitId);
      return order.status === "completed" && visit?.status === "inactive";
    });
  }, [orders, visits]);

  const statsValue = useMemo(() => {
    const total = completedOrders.reduce(
      (sum: number, o: any) => sum + (o.totalAmount || 0),
      0,
    );
    return { total };
  }, [completedOrders]);

  const handlePayment = (order: any, method: "cash" | "card" | "other") => {
    if (method === "other") {
      toast.info("سيتم توفير هذه الخدمة مستقبلاً");
      return;
    }
    processPaymentMutation.mutate({
      orderId: order.id,
      visitId: order.visitId,
    });
  };

  const handlePrintInvoice = (order: any) => {
    setSelectedOrderForInvoice(order);
    toast.success("جاري تجهيز الفاتورة للطباعة...");
    setTimeout(() => window.print(), 500);
  };

  const navItems = [
    {
      label: "طلبات جاهزة للدفع",
      icon: "⏳",
      onClick: () => setActiveTab("pending"),
    },
    {
      label: "أرشيف المبيعات",
      icon: "✅",
      onClick: () => setActiveTab("completed"),
    },
    { label: "الإحصائيات", icon: "📊", onClick: () => setActiveTab("stats") },
  ];

  return (
    <DashboardLayout
      title="صندوق المحاسبة"
      subtitle="إدارة فواتير الطاولات"
      onLogout={onLogout}
      navItems={navItems}
    >
      {activeTab === "stats" && <StatsView total={statsValue.total} />}

      {activeTab === "pending" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map((order: any) => (
            <PendingOrderCard
              key={order.id}
              order={order}
              onPrint={handlePrintInvoice}
              onPayment={handlePayment}
            />
          ))}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
          {completedOrders.map((order: any) => (
            <CompletedOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      <PrintInvoice order={selectedOrderForInvoice} />
    </DashboardLayout>
  );
}
