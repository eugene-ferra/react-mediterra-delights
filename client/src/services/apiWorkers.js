import api from "./apiClient";

export const postWorker = async (data) => {
  return await api.postForm("/api/workers/", data);
};

export const patchWorker = async (id, data) => {
  return await api.patch(`/api/workers/${id}`, data);
};

export const deleteWorker = async (id) => {
  return await api.delete(`/api/workers/${id}`);
};

export const getWorkers = async (query) => {
  return await api.get(`/api/workers?${query}`);
};

export const getWorker = async (id) => {
  return await api.get(`/api/workers/${id}`);
};

export const getWorkersOptions = async () => {
  return await api.get(`/api/workers/options`);
};
