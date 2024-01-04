import api from "./apiClient";

export const postProduct = async (data) => {
  return await api.postForm("/api/products/", data);
};

export const patchProduct = async (id, data) => {
  return await api.patch(`/api/products/${id}`, data);
};

export const getProducts = async (page) => {
  return await api.get(`/api/products?page=${page}`);
};

export const getOneProduct = async (id) => {
  return await api.get(`/api/products/${id}`);
};

export const getProductImages = async (id) => {
  return await api.get(`/api/files/products/${id}`);
};
