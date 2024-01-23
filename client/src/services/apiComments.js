import api from "./apiClient";

export const postComment = async (data) => {
  return await api.postForm("/api/comments/", data);
};

export const getComments = async (query) => {
  return await api.get(`/api/comments?${query}`);
};

export const patchComment = async (id, data) => {
  return await api.patch(`/api/comments/${id}`, data);
};

export const deleteComment = async (id) => {
  return await api.delete(`/api/comments/${id}`);
};
