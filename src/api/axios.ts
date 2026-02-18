import axios from "axios";
import type { GuestData } from "../Components/CustomerEntry/guest";

export const API_URL = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

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