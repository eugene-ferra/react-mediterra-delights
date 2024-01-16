import { useQuery } from "@tanstack/react-query";
import { getArticleOptions } from "../services/apiOptions";

export const useArticleOptions = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getArticleOptions,
    queryKey: ["articleOptions"],
    staleTime: Infinity,
  });

  return { options: data, isLoading: isLoading, error: error };
};
