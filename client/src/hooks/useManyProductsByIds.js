import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export const useManyProductsByIds = (ids = [], page = 1) => {
  let queryStr = ids?.length ? ids.map((id) => `_id[in]=${id}`).join("&") : false;

  const result = useQuery({
    queryKey: ["products", [...ids], page],
    queryFn: ids?.length == 0 ? () => [] : () => getProducts(`${queryStr}&page=${page}`),
    staleTime: 0,
  });

  return {
    products: result.data,
    isLoading: result.isPending,
    error: result.error,
  };
};
