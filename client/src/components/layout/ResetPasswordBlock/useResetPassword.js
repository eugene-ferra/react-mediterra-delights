import { resetPassword } from "../../../services/apiUsers";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const next = new URLSearchParams(location.search).get("next");

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => resetPassword(data?.token, data?.email, data?.password),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Пароль успішно змінено!");
      navigate(`/login${next && `?next=${next}`}`);
    },
    onError: (errObj) => {
      if (errObj?.navTo) navigate(errObj.navTo);
      if (errObj?.message) toast.error(errObj.message);
      setErrors(errObj?.errors);
    },
  });

  return {
    resetPassword: mutate,
    isLoading: isPending,
    errors,
  };
};
