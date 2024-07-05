import api from "./apiClient";

export const postProduct = async (data) => {
  return await api.postForm("/api/products/", data);
};

export const patchProduct = async (id, data) => {
  return await api.patch(`/api/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/api/products/${id}`);
};

export const getProducts = async (query) => {
  return await api.get(`/api/products?${query}`);
};

export const getOneProduct = async (id) => {
  return await api.get(`/api/products/${id}`);
};

export const getProductImages = async (id) => {
  return await api.get(`/api/files/products/${id}`);
};

export const getProductsReviews = async (id, page, limit) => {
  return await api.get(`/api/products/${id}/reviews?page=${page}&limit=${limit}`);
};
