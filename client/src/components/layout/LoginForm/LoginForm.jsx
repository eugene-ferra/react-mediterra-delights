import { useState } from "react";
import { Link } from "react-router-dom";
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

const LoginForm = () => {
  const { login, isLoading, errors } = useLogin();
  const { register, handleSubmit } = useForm();

  const [isPassShow, setIsPassShow] = useState(false);

  async function onSubmit(data) {
    login(data);
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
        />
        <Input
          type={"password"}
          title={"Пароль*"}
          errorMessage={errors?.password}
          register={register("password")}
          disabled={isLoading}
          isShow={isPassShow}
          onShow={() => setIsPassShow((state) => !state)}
        />
        {errors?.all ? <Text type={"small"}>{errors?.all}</Text> : null}

        <Button disabled={isLoading} style={{ width: "100%" }}>
          {isLoading ? <Loader /> : "Увійти"}
        </Button>
        <Text type="small" align={"center"}>
          Забули пароль? <Link to="/forgot-password">Відновити доступ</Link> <br />
          Ще не маєте аккаунту? <Link to="/signup">Зареєструватися</Link>{" "}
        </Text>
      </Form>
    </MainLayout>
  );
};

export default LoginForm;
