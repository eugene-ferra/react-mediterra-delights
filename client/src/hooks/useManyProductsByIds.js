import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiProducts";

export const useManyProductsByIds = (ids = []) => {
  let queryStr = ids?.length ? ids.map((id) => `_id[in]=${id}`).join("&") : false;

  const result = useQuery({
    queryKey: ["products", [...ids]],
    queryFn: ids?.length == 0 ? () => [] : () => getProducts(queryStr),
    staleTime: 0,
    retry: 2,
  });

  return {
    products: result.data,
    isLoading: result.isPending,
    error: result.error,
  };
};
