import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../api/axios";

export function useAccounts() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => (await axios.get(`${API_URL}/orders`)).data,
  });

  const processedStats = orders.reduce((acc: any, order: any) => {
    const date = new Date(order.createdAt);
    const month = date.toLocaleString('ar-EG', { month: 'long' });
    
    if (!acc[month]) {
      acc[month] = { month, revenue: 0, ordersCount: 0 };
    }
    
    acc[month].revenue += order.totalAmount;
    acc[month].ordersCount += 1;
    return acc;
  }, {});

  const monthlyStats = Object.values(processedStats).map((stat: any) => ({
    ...stat,
    average: (stat.revenue / stat.ordersCount).toFixed(2)
  }));

  const completedOrders = orders
    .filter((o: any) => o.status === "completed")
    .map((o: any) => ({
      id: o.id,
      orderNumber: o.id.split('-')[1],
      table: `الطاولة ${o.tableNumber}`,
      date: new Date(o.createdAt).toLocaleDateString('ar-EG'),
      total: o.totalAmount.toFixed(2)
    }));

  return { monthlyStats, completedOrders, isLoading };
}