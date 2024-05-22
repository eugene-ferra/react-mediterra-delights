import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorker } from "../../../services/apiWorkers";
import toast from "react-hot-toast";

export const useDeleteWorker = (resetForm) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleting = useMutation({
    mutationFn: (id) => deleteWorker(id),
    onSuccess: () => {
      toast.success("Робітника успішно видалено!");
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
    deleteWorker: deleting.mutate,
    isDeleting: deleting.isPending,
    errors: errors,
  };
};
