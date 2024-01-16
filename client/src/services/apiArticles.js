import api from "./apiClient";

export const postArticle = async (data) => {
  return await api.postForm("/api/articles/", data);
};

export const getArticles = async (query) => {
  return await api.get(`/api/articles?${query}`);
};

export const getOneArticle = async (id) => {
  return await api.get(`/api/articles/${id}`);
};

export const patchArticle = async (id, data) => {
  return await api.patch(`/api/articles/${id}`, data);
};

export const deleteArticle = async (id) => {
  return await api.delete(`/api/articles/${id}`);
};
