import { useQuery } from "@tanstack/react-query";
import { getArticleOptions } from "../services/apiOptions";

export const useArticleOptions = () => {
  const { data } = useQuery({
    queryFn: getArticleOptions,
    queryKey: ["articleOptions"],
    staleTime: Infinity,
  });

  return { options: data };
};
