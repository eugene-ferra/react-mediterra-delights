import { useQuery } from "@tanstack/react-query";
import { getWorkersOptions } from "../services/apiWorkers";

export const useWorkersOptions = () => {
  const query = useQuery({
    queryFn: getWorkersOptions,
    queryKey: ["workersOptions"],
    staleTime: Infinity,
  });

  return { options: query.data, isLoading: query.isLoading, error: query.error };
};
