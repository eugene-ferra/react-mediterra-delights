import axios from "axios";

export async function register({ name, lastName, email, password }) {
  try {
    const response = await axios.post(`api/auth/signup`, {
      name,
      lastName,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    switch (err.response.status) {
      case 400:
        throw err.response.data.errors.reduce((acc, { path, msg }) => {
          acc[path] = msg;
          return acc;
        }, {});
      case 409:
        throw { email: "Користувач із цим email уже зареєетрований!" };
      default:
        throw new Error("bad");
    }
  }
}
