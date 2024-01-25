import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/apiUsers";

export const useUser = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    staleTime: 0,
  });

  return {
    user: data || null,
    isLoading: isLoading,
  };
};
