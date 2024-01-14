import { useQuery } from "@tanstack/react-query";
import { getProductOptions } from "../services/apiOptions";

export const useProductsOptions = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getProductOptions,
    queryKey: ["productOptions"],
    staleTime: Infinity,
  });

  return { options: data, isLoading: isLoading, error: error };
};
