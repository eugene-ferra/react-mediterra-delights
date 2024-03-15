import api from "./apiClient";

export const postOrder = async (data) => {
  return await api.postForm("/api/orders/", data);
};

export const getOrders = async (query) => {
  return await api.get(`/api/orders?${query}`);
};

export const getOneOrder = async (id) => {
  return await api.get(`/api/orders/${id}`);
};

export const patchOrder = async (id, data) => {
  return await api.patch(`/api/orders/${id}`, data);
};

export const deleteOrder = async (id) => {
  return await api.delete(`/api/orders/${id}`);
};
