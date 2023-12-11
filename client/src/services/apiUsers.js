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
        throw err.response.data.errors.reduce(
          (acc, { path, msg }) => {
            acc[path] = msg;
            return acc;
          },
          { status: 400 }
        );
      case 409:
        throw { stutus: 409, email: "Користувач із цим email уже зареєетрований!" };
      default:
        throw { status: 500 };
    }
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(`api/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    switch (err.response.status) {
      case 400:
        throw (
          err.response.data?.errors?.reduce(
            (acc, { path, msg }) => {
              acc[path] = msg;
              return acc;
            },
            { status: 400 }
          ) || { status: 400, all: "Неправильний email або пароль!" }
        );
      default:
        throw { status: 500 };
    }
  }
}
