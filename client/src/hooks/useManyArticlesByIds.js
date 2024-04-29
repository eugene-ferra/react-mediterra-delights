import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/apiArticles";

export const useManyArticlesByIds = (ids, page = 1) => {
  let queryStr = ids?.length ? ids.map((id) => `_id[in]=${id}`).join("&") : false;

  const result = useQuery({
    queryKey: ["articles", [...ids], page],
    queryFn: ids?.length == 0 ? () => [] : () => getArticles(`${queryStr}&page=${page}`),
    staleTime: 0,
  });

  return {
    articles: result.data,
    isLoading: result.isPending,
    error: result.error,
  };
};
