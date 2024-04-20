import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/apiProducts";

export const useProducts = (urlQuery) => {
  const query = useQuery({
    queryFn: () => getProducts(urlQuery),
    queryKey: ["adminProducts", urlQuery],
    staleTime: 10 * 60 * 1000,
  });

  return {
    products: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
