import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ordersApi, visitsApi } from "../../api/axios";
import DashboardLayout from "../DashboardLayout";
import { ArchiveHeader } from "./SalesArchive/ArchiveHeader";
import { SalesTable } from "./SalesArchive/SalesTable";
import { SaleDetailsModal } from "./SalesArchive/SaleDetailsModal";

export default function SalesArchive({ onLogout }: { onLogout: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSale, setSelectedSale] = useState<any | null>(null);

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

  const completedSales = useMemo(() => {
    return visits
      .filter((v: any) => v.status === "inactive")
      .map((visit: any) => {
        const visitOrders = orders.filter((o: any) => o.visitId === visit.id);
        const allItems = visitOrders.flatMap((o: any) => o.items);
        const totalAmount = visitOrders.reduce(
          (sum: number, o: any) => sum + (o.totalAmount || 0),
          0,
        );
        const dateObj = new Date(visit.entryTime);
        return {
          id: visit.id,
          tableNumber: visit.tableNumber,
          time: dateObj.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
          date: dateObj.toLocaleDateString("ar-EG"),
          itemsCount: allItems.length,
          items: allItems,
          total: totalAmount,
          method: "💵 نقدي",
        };
      })
      .filter((s) => s.total > 0)
      .sort((a, b) => b.id.localeCompare(a.id));
  }, [visits, orders]);

  const filteredSales = useMemo(() => {
    return completedSales.filter((s) =>
      s.tableNumber.toString().includes(searchTerm),
    );
  }, [completedSales, searchTerm]);

  const handlePrint = (sale: any) => {
    setSelectedSale(sale);
    setTimeout(() => window.print(), 500);
  };

  return (
    <DashboardLayout
      title="سجل المبيعات"
      subtitle="عرض العمليات المنجزة"
      onLogout={onLogout}
    >
      <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <ArchiveHeader
          count={completedSales.length}
          onSearchChange={setSearchTerm}
        />
        <SalesTable
          sales={filteredSales}
          onSelect={setSelectedSale}
          onPrint={handlePrint}
        />
      </div>

      <SaleDetailsModal
        sale={selectedSale}
        onClose={() => setSelectedSale(null)}
      />

      {/* Print View Hidden */}
      <div className="hidden print:block p-8 text-right" dir="rtl">
        <div className="text-center mb-8 border-b-2 border-black pb-4">
          <h1 className="text-2xl font-black">فاتورة مبيعات</h1>
          <p>طاولة رقم: {selectedSale?.tableNumber}</p>
          <p className="text-sm">
            {selectedSale?.date} - {selectedSale?.time}
          </p>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b border-black">
              <th className="py-2 text-right">الصنف</th>
              <th className="text-center">الكمية</th>
              <th className="text-left">السعر</th>
            </tr>
          </thead>
          <tbody>
            {selectedSale?.items.map((item: any, i: number) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2">{item.name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-left">{item.price * item.quantity} ر.س</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-left font-black text-xl">
          المجموع: {selectedSale?.total.toFixed(2)} ر.س
        </div>
      </div>
    </DashboardLayout>
  );
}
