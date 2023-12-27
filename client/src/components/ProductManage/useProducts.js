import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export const useProducts = (page) => {
  const query = useQuery({
    queryFn: () => getProducts(page),
    queryKey: ["adminProducts", page],
    staleTime: 10 * 60 * 1000,
  });

  return {
    products: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
