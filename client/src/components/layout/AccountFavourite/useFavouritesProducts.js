import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/apiProducts";

export const useFavouritesProducts = (ids) => {
  let queryStr = ids?.length ? ids.map((id) => `_id[in]=${id}`).join("&") : false;

  const result = useQuery({
    queryKey: ["favouriteProducts"],
    queryFn: ids?.length == 0 ? () => [] : () => getProducts(queryStr),
    staleTime: 0,
  });

  return {
    products: result.data,
    isLoading: result.isPending,
    error: result.error,
  };
};
