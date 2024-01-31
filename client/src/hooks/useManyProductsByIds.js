import { useQueries } from "@tanstack/react-query";
import { getOneProduct } from "../services/apiProducts";

export const useManyProductsByIds = (ids = []) => {
  const results = useQueries({
    queries: ids?.map((id, i) => {
      return {
        queryKey: ["product", id],
        queryFn: () => getOneProduct(id),
        retry: 2,
      };
    }),
  });

  return {
    products: results.map((result) => result.data) || [],
    isLoading: results.some((result) => result.isPending),
    error: results.map((result) => result.error),
  };
};
