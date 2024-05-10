import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/apiComments";

export const useComments = (queryStr) => {
  const query = useQuery({
    queryFn: () => getComments(queryStr),
    queryKey: ["comments", queryStr],
    staleTime: 0,
  });

  return {
    comments: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};