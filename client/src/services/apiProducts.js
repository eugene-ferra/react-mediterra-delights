import api from "./apiClient";

export const postProduct = async (data) => {
  return await api.postForm("/api/products/", data);
};

export const getProducts = async (page) => {
  return await api.get(`/api/products?page=${page}`);
};
