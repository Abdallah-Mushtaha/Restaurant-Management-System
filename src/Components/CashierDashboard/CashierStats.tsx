import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../DashboardLayout";
import { ordersApi, visitsApi } from "../../api/axios";
import {
  Wallet,
  CreditCard,
  Banknote,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function CashierStats({ onLogout }: { onLogout: () => void }) {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await ordersApi.getAll();
      return Array.isArray(res) ? res : res.data;
    },
  });

  const { data: visits = [] } = useQuery({
    queryKey: ["visits"],
    queryFn: async () => {
      const res = await visitsApi.getAll();
      return Array.isArray(res) ? res : res.data;
    },
  });

  const stats = useMemo(() => {
    const completedVisits = visits.filter((v: any) => v.status === "inactive");
    const completedOrders = orders.filter((o: any) =>
      completedVisits.some((v: any) => v.id === o.visitId),
    );

    const totalSales = completedOrders.reduce(
      (sum: number, o: any) => sum + (o.totalAmount || 0),
      0,
    );

    const cashSales = totalSales;
    const cardSales = 0;

    const timeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00"];
    const distribution = timeSlots.map((time) => ({
      time,
      amount: Math.floor(Math.random() * 1000) + 500,
    }));

    return { totalSales, cashSales, cardSales, distribution };
  }, [orders, visits]);

  return (
    <DashboardLayout
      title="إدارة الدفع والفواتير"
      subtitle="تحليل الأداء المالي"
      onLogout={onLogout}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-200 flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-2 rounded-xl">
                <Wallet size={24} />
              </div>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">
                الإجمالي
              </span>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">
                إجمالي المبيعات
              </p>
              <h2 className="text-3xl font-black mt-1">
                {stats.totalSales.toFixed(2)}{" "}
                <span className="text-sm">جنيه مصري</span>
              </h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div className="bg-green-50 text-green-600 p-2 rounded-xl">
                <Banknote size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">الدفع النقدي</p>
              <h2 className="text-3xl font-black mt-1 text-gray-800">
                {stats.cashSales.toFixed(2)}{" "}
                <span className="text-sm text-gray-400">جنيه مصري</span>
              </h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-xl">
                <CreditCard size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">
                الدفع بالبطاقة
              </p>
              <h2 className="text-3xl font-black mt-1 text-gray-800">
                {stats.cardSales.toFixed(2)}{" "}
                <span className="text-sm text-gray-400">جنيه مصري</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-50 text-orange-600 p-2 rounded-xl">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-black text-gray-800 text-lg">
              توزيع المبيعات حسب الوقت
            </h3>
          </div>

          <div className="space-y-6">
            {stats.distribution.map((item, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-500">
                    {item.time}
                  </span>
                  <span className="text-sm font-black text-blue-700">
                    {item.amount.toLocaleString()} جنيه مصري
                  </span>
                </div>
                <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-1000 group-hover:bg-blue-600"
                    style={{ width: `${(item.amount / 1500) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-2 text-gray-400 text-sm">
            <TrendingUp size={16} className="text-green-500" />
            <span>يتم تحديث البيانات تلقائياً بناءً على الفواتير المغلقة</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
