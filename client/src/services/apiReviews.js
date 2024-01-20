import api from "./apiClient";

export const postReview = async (data) => {
  return await api.postForm("/api/reviews/", data);
};

export const getReviews = async (query) => {
  return await api.get(`/api/reviews?${query}`);
};
