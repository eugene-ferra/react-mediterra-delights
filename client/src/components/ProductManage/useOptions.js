import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useOptions = () => {
  const query = useQuery({
    queryFn: axios.get("api/product/options"),
    queryKey: ["productOptions"],
  });

  return { options: query.data };
};
