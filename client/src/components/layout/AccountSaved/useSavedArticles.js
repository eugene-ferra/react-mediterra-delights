import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../../services/apiArticles";

export const useSavedArticles = (ids) => {
  let queryStr = ids?.length ? ids.map((id) => `_id[in]=${id}`).join("&") : false;

  const result = useQuery({
    queryKey: ["savedArticles"],
    queryFn: ids?.length == 0 ? () => [] : () => getArticles(queryStr),
    staleTime: 0,
  });

  return {
    articles: result.data,
    isLoading: result.isPending,
    error: result.error,
  };
};
