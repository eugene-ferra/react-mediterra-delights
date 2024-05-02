import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { proceedOrder } from "../../../services/apiOrders";
import toast from "react-hot-toast";

export const useProceedOrder = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const proceeding = useMutation({
    mutationFn: (data) => proceedOrder(data.id, data.data),
    onSuccess: (data) => {
      toast.success("Cтатус замовлення успішно оновлено!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", data?.id] });
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
      setErrors(errObj.errors);
    },
  });

  return {
    proceedOrder: proceeding.mutate,
    isProceeding: proceeding.isPending,
    errors: errors,
  };
};
