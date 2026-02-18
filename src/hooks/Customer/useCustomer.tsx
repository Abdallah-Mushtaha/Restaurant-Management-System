import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { guestService } from "../../api/axios";
import type { GuestData } from "../../Components/CustomerEntry/guest";

export const useRegisterGuest = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: GuestData) => {
      const isOccupied = await guestService.checkTableStatus(data.tableNumber);

      if (isOccupied) {
        throw new Error("occupied");
      }

      return await guestService.registerVisit(data);
    },
    onSuccess: (data) => {
      localStorage.setItem("guest", JSON.stringify(data));
      toast.success("أهلاً بك! تم تأكيد طاولة رقم " + data.tableNumber);
      navigate("/menu");
    },
    onError: (error: Error) => {
      if (error.message === "occupied") {
        toast.error("عذراً، هذه الطاولة محجوزة حالياً");
      } else {
        toast.error("حدث خطأ في الاتصال، تأكد من تشغيل السيرفر");
      }
    },
  });
};
