import { useQuery } from "@tanstack/react-query";
import { getOneProduct } from "../services/apiProducts";

export const useProduct = (id) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id),
  });

  return {
    product: data || null,
    isLoading: isLoading,
    isError: isError,
    error: error,
  };
};
