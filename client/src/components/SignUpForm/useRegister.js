import { register as apiRegister } from "../../services/apiUsers";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => apiRegister(data),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(new URLSearchParams(location.search).get("next") || "/");
    },
    onError: (errObj) => {
      setErrors(errObj);
    },
  });

  return {
    signup: mutate,
    isLoading: isPending,
    errors,
  };
};
