import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postWorker } from "../../../services/apiWorkers";
import toast from "react-hot-toast";

export const useAddWorker = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adding = useMutation({
    mutationFn: (data) => postWorker(data),
    onSuccess: () => {
      toast.success("Робітника успішно додано!");
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      resetForm();
      navigate("/admin/workers");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    addWorker: adding.mutate,
    isAdding: adding.isPending,
    errors: errors,
  };
};
