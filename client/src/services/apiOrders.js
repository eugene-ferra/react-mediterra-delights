import api from "./apiClient";

export const postOrder = async (data) => {
  return await api.postForm("/api/orders/", data);
};

export const createCheckout = async (data) => {
  return await api.postForm("/api/orders/create-checkout", data);
};

export const getOrders = async (query) => {
  return await api.get(`/api/orders?${query}`);
};

export const getOneOrder = async (id) => {
  return await api.get(`/api/orders/${id}`);
};

export const getStatsByYear = async (year) => {
  return await api.get(`/api/orders/stats/${year}`);
};

export const getStatsByMonth = async (year, month) => {
  return await api.get(`/api/orders/stats/${year}/${month}`);
};

export const patchOrder = async (id, data) => {
  return await api.patch(`/api/orders/${id}`, data);
};

export const proceedOrder = async (id, data) => {
  return await api.patch(`/api/orders/${id}/proceed`, data);
};

export const deleteOrder = async (id) => {
  return await api.delete(`/api/orders/${id}`);
};
