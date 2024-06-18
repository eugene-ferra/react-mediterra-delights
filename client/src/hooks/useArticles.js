import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/apiArticles";

export const useArticles = (query) => {
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getArticles(query),
    queryKey: ["articles", query],
    staleTime: 0,
    enabled: query != null,
  });

  return { articles: data, isLoading, error, isError };
};
