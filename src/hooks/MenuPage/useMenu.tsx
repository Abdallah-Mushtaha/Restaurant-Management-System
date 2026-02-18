import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { MenuItem } from "../../Components/MenuComponents/MenuItem";
import { API_URL } from "../../api/axios";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } = await axios.get<MenuItem[]>(`${API_URL}/menu`);
      return data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};
