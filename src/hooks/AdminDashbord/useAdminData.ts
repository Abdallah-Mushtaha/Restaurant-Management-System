import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ordersApi, API_URL } from "../../api/axios";

export function useAdminData() {
  const { data: menu = [], isLoading: isLoadingMenu } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => (await axios.get(`${API_URL}/menu`)).data,
  });

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await ordersApi.getAll(),
  });

  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axios.get(`${API_URL}/users`)).data,
  });

  const stats = useMemo(() => {
    const completedOrders = orders?.filter((o: any) => o.status === "completed") || [];
    return {
      totalRevenue: completedOrders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0),
      totalOrders: completedOrders.length,
      productsCount: menu.length,
      visitorsCount: users.length,
    };
  }, [menu, orders, users]);

  return {
    menu,
    stats,
    isLoading: isLoadingMenu || isLoadingOrders || isLoadingUsers
  };
}