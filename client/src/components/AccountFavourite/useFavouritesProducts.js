import { useQueries } from "@tanstack/react-query";
import { getOneProduct } from "../../services/apiProducts";

export const useFavouritesProducts = (ids) => {
  const results = useQueries({
    queries: ids?.map((id) => ({
      queryKey: ["product", id],
      queryFn: () => getOneProduct(id),
      staleTime: 0,
    })),
  });

  return {
    products: results.map((result) => result.data),
    isLoading: results.some((result) => result.isPending),
    error: results.map((result) => result.error),
  };
};
