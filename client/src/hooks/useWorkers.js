import { useQuery } from "@tanstack/react-query";
import { getWorkers } from "../services/apiWorkers";

export const useWorkers = (queryStr) => {
  const query = useQuery({
    queryFn: () => getWorkers(queryStr),
    queryKey: ["workers", queryStr],
    staleTime: 20 * 60 * 1000,
  });

  return {
    workers: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};
