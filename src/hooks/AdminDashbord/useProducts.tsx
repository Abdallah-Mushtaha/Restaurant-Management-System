import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../api/axios";

export function useProducts() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["menu-products"],
    queryFn: async () => (await axios.get(`${API_URL}/menu`)).data,
    staleTime: 1000 * 60 * 5,
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string | number) => axios.delete(`${API_URL}/menu/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["menu-products"] }),
  }).mutate;

  const addProduct = useMutation({
    mutationFn: (newProduct: any) => axios.post(`${API_URL}/menu`, newProduct),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["menu-products"] }),
  }).mutate;

  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: any; data: any }) =>
      axios.patch(`${API_URL}/menu/${id}`, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["menu-products"] }),
  }).mutate;

  return {
    ...query,
    deleteProduct,
    addProduct,
    updateProduct,
    isMutating: query.isLoading,
  };
}
