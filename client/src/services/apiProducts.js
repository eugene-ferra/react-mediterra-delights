import api from "./apiClient";

export const postProduct = async (data) => {
  return await api.postForm("/api/products/", data);
};
