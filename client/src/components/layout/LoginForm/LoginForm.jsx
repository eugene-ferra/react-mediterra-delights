import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import Input from "../../common/Input/Input";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import Form from "../Form/Form";
import MainLayout from "../MainLayout/MainLayout";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";
import styles from "./LoginForm.module.scss";
import { prepareData } from "../../../utils/prepareData";

const LoginForm = () => {
  const { login, isLoading, errors } = useLogin();
  const { register, handleSubmit, setValue } = useForm();

  const [isPassShow, setIsPassShow] = useState(false);

  const location = useLocation();

  const pathname = new URLSearchParams(location?.search).get("next") || "/";

  async function onSubmit(data) {
    login(prepareData(data));
  }

  return (
    <MainLayout className={styles.layout}>
      <Form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Title align={"center"}>Вхід</Title>
        <Text align={"center"}>Маєте аккаунт? Заповніть поля нижче, щоб увійти</Text>
        <Input
          title={"Електронна пошта*"}
          type={"email"}
          placeholder={"example@domain.com"}
          errorMessage={errors?.email}
          register={register("email")}
          disabled={isLoading}
          onChange={(event) => setValue("email", event.target.value)}
        />
        <Input
          type={"password"}
          title={"Пароль*"}
          errorMessage={errors?.password}
          register={register("password")}
          disabled={isLoading}
          isShow={isPassShow}
          onShow={() => setIsPassShow((state) => !state)}
          onChange={(event) => setValue("password", event.target.value)}
        />
        {errors?.all ? <Text type={"small"}>{errors?.all}</Text> : null}

        <Button disabled={isLoading} style={{ width: "100%" }}>
          {isLoading && <Loader />} Увійти
        </Button>
        <Text type="small" align={"center"}>
          Забули пароль?{" "}
          <Link to={`/forgot-password?next=${pathname}`}>Відновити доступ</Link> <br />
          Ще не маєте аккаунту?
          <Link to={`/signup?next=${pathname}`}>Зареєструватися</Link>{" "}
        </Text>
      </Form>
    </MainLayout>
  );
};

export default LoginForm;
