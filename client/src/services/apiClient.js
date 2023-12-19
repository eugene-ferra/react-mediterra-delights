import axios from "axios";

const api = axios.create({});

api.interceptors.response.use(
  (response) => response.data.data,
  async (error) => {
    const { status, data, config } = error.response;

    if (status === 400) {
      console.log("IN 400");
      if (data?.errors) {
        const errors = data.errors?.reduce(
          (acc, { path, msg }) => {
            acc[path] = msg;
            return acc;
          },
          { status }
        );

        throw { status, errors, message: "Помилка! Спробуйте ще раз!" };
      }
      if (data?.message) {
        throw { status, message: data.message };
      }

      throw { status, message: "Щось пішло не так. Спробуйте ще раз!" };
    } else if (status === 401) {
      try {
        await axios.get("/api/auth/refresh");
      } catch (error) {
        const { status } = error.response;

        if (status === 400 || status === 401)
          throw {
            status,
            message: "Будь-ласка увійдіть в свій аккаунт!",
            navTo: "/login",
          };

        if (status === 403) throw { status, navTo: "/403" };

        if (status === 429)
          throw { status, message: "Забагато запитів. Спробуйте пізніше!" };

        throw { status, navTo: "/500", message: "Сталася непередбачувана помилка!" };
      }
      return await api(config);
    } else if (status === 403) {
      throw { status, navTo: "/403" };
    } else if (status === 404) {
      throw { status, data: null, message: "Нічого не знайдено!" };
    } else if (status === 409) {
      throw { status, message: data?.message || "Об'єкт вже існує!" };
    } else if (status === 429) {
      console.log("PLEASE");
      throw { status, message: "Забагато запитів. Спробуйте пізніше!" };
    } else if (status === 500) {
      throw { status, navTo: "/500", message: "Сталася непередбачувана помилка!" };
    } else {
      throw { status, message: "Сталася помилка... Спробуйте ще раз" };
    }
  }
);

export default api;

//responseShema
// {
//   status,
//   message || undefined,
//   navTo || undefined,
//   errors || undefined
//   data || null
// }
