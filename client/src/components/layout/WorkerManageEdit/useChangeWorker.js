import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchWorker } from "../../../services/apiWorkers";
import toast from "react-hot-toast";

export const useChangeWorker = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const changing = useMutation({
    mutationFn: (data) => patchWorker(data.id, data.data),
    onSuccess: () => {
      toast.success("Дані робітника успішно оновлено!");
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      resetForm && resetForm();
      navigate("/admin/workers");
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);

      setErrors(errObj.errors);
    },
  });

  return {
    changeWorker: changing.mutate,
    isChanging: changing.isPending,
    errors: errors,
  };
};
