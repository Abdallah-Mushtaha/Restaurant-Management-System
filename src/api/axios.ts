import axios from "axios";
import type { GuestData } from "../Components/CustomerEntry/guest";

export const API_URL = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export const visitsApi = {
  getAll: async () => {
    const { data } = await api.get("/visits");
    return data;
  },
  updateStatus: async (id: string, status: "active" | "inactive") => {
    const { data } = await api.patch(`/visits/${id}`, { status });
    return data;
  }
};

export const guestService = {
  checkTableStatus: async (tableNumber: number) => {
    const { data } = await api.get<GuestData[]>(`/visits?tableNumber=${tableNumber}&status=active`);
    return data.length > 0;
  },

  registerVisit: async (guestData: GuestData) => {
    const { data } = await api.post<GuestData>("/visits", guestData);
    return data;
  }
};

export const orderService = {
  createOrder: async (orderData: any) => {
    const { data } = await api.post("/orders", orderData);
    return data;
  }
};

export const ordersApi = {
  getAll: async () => {
    const { data } = await api.get("/orders");
    return data;
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await api.patch(`/orders/${id}`, { status });
    return data;
  }
};

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const { data: users } = await api.get<any[]>("/users");
    const user = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      return {
        success: true,
        data: { user }
      };
    }
    return { success: false };
  }
};