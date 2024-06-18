import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export const useProducts = (query) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getProducts(query),
    queryKey: ["products", query],
    enabled: query != null,
    staleTime: 0,
  });

  return { products: data, isLoading: isLoading, error: error };
};
