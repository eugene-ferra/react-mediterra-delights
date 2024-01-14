import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export const useProducts = (query) => {
  console.log(query);
  const { data, isLoading, error } = useQuery({
    queryFn: () => getProducts(query),
    queryKey: ["products", query],
  });

  return { products: data, isLoading: isLoading, error: error };
};
