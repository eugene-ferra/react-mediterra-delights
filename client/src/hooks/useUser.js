import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../services/apiUsers";
import { toast } from "react-hot-toast";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });

  // If the user's refresh token is expired, we remove the user from the cache
  if (data && error && error.status === 401) {
    queryClient.removeQueries({ queryKey: ["user"] });
    toast.error("Упс(( Вам необхідно повторно увійти в аккаунт!");
  }

  return {
    user: data || null,
    isLoading: isLoading,
  };
};
