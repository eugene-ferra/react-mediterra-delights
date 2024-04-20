import { useQuery } from "@tanstack/react-query";
import { getOrderOptions } from "../../../services/apiOptions";

export const useOrderOptions = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getOrderOptions,
    queryKey: ["orderOptions"],
    staleTime: Infinity,
  });

  return { options: data, isLoading: isLoading, error: error };
};
