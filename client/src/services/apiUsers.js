import api from "./apiClient";

export async function register({ name, lastName, email, password }) {
  return await api.post(`api/auth/signup`, {
    name,
    lastName,
    email,
    password,
  });
}

export async function login({ email, password }) {
  const response = await api.post(`api/auth/login`, {
    email,
    password,
  });

  return response.data;
}

export async function getMe() {
  return await api.get("/api/users/me");
}

export async function logout() {
  return await api.get("/api/auth/logout");
}

export async function forgotPassword(data) {
  return await api.post("/api/auth/forgot-password", data);
}

export async function resetPassword(token, email, password) {
  return await api.patch(`/api/auth/reset-password/${token}?email=${email}`, {
    password,
  });
}

export async function updateMe(data) {
  return await api.patch("/api/users/me", data);
}

export async function deleteMe() {
  return await api.delete("/api/users/me");
}

export async function saveProduct(id) {
  return await api.post(`/api/users/me/savedProducts`, { id: id });
}
export async function deleteProduct(id) {
  return await api.delete(`/api/users/me/savedProducts/${id}`);
}

export async function saveArticle(id) {
  return await api.post(`/api/users/me/savedArticles`, { id: id });
}
export async function deleteArticle(id) {
  return await api.delete(`/api/users/me/savedArticles/${id}`);
}

export async function likeArticle(id) {
  return await api.post(`/api/users/me/likedArticles`, { id: id });
}
export async function unLikeArticle(id) {
  return await api.delete(`/api/users/me/likedArticles/${id}`);
}

export async function addToCart(id, quantity) {
  return await api.post(`/api/users/me/cart`, { id, quantity });
}
export async function updateCart(id, quantity) {
  return await api.patch(`/api/users/me/cart/${id}`, { id, quantity });
}
export async function deleteFromCart(id) {
  return await api.delete(`/api/users/me/cart/${id}`);
}
export async function clearCart() {
  return await api.delete("/api/users/me/cart");
}

export async function getSavedProducts(page) {
  return await api.get(`/api/users/me/savedProducts?page=${page}`);
}
export async function getSavedArticles(page) {
  return await api.get(`/api/users/me/savedArticles?page=${page}`);
}
export async function getOrdersHistory(page) {
  return await api.get(`/api/users/me/orders?page=${page}`);
}
