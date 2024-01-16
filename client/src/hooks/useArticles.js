import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../services/apiArticles";

export const useArticles = (query) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getArticles(query),
    queryKey: ["articles", query],
    staleTime: 0,
  });

  return { articles: data, isLoading: isLoading, error: error };
};
