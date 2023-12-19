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
