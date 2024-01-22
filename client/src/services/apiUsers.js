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

export async function saveProduct(id) {
  return await api.post(`/api/users/me/savedProducts`, { id: id });
}
export async function deleteProduct(id) {
  return await api.delete(`/api/users/me/savedProducts/${id}`);
}

export async function addToCart(id, quantity) {
  return await api.post(`/api/users/me/cart`, { id, quantity });
}
export async function deleteFromCart(id) {
  return await api.delete(`/api/users/me/cart/${id}`);
}
