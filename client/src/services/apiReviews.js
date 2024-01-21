import api from "./apiClient";

export const postReview = async (data) => {
  return await api.postForm("/api/reviews/", data);
};

export const getReviews = async (query) => {
  return await api.get(`/api/reviews?${query}`);
};

export const patchReview = async (id, data) => {
  return await api.patch(`/api/reviews/${id}`, data);
};

export const deleteReview = async (id) => {
  return await api.delete(`/api/reviews/${id}`);
};
