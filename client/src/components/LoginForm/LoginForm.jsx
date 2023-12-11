import Input from "../common/Input/Input";
import Title from "../common/Title/Title";
import Text from "../common/Text/Text";
import styles from "./LoginForm.module.scss";
import Form from "../common/Form/Form";
import MainLayout from "../MainLayout/MainLayout";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import Loader from "../common/Loader/Loader";

const LoginForm = () => {
  const { login, isLoading, errors } = useLogin();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    login(data);
  }

  return (
    <MainLayout className={styles.layout}>
      <Form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <Title className={styles.title}>Вхід</Title>
        <Text className={styles.text}>
          Маєте аккаунт? Заповніть поля нижче, щоб увійти
        </Text>
        <Input
          className={styles.input}
          title={"Електронна пошта*"}
          type={"email"}
          placeholder={"example@domain.com"}
          name={"email"}
          errorMessage={errors.email || Boolean(errors.all)}
          register={register("email")}
          disabled={isLoading}
        />
        <Input
          className={styles.input}
          type={"password"}
          title={"Пароль*"}
          name={"password"}
          errorMessage={errors.password || Boolean(errors.all)}
          register={register("password")}
          disabled={isLoading}
        />
        <Text className={styles.errorText} type={"small"}>
          {errors?.all}
        </Text>
        <Button className={styles.button} disabled={isLoading}>
          {isLoading ? <Loader /> : "Увійти"}
        </Button>
        <Text className={styles.textSmall} type="small">
          Забули пароль? <Link to="/forgot-password">Відновити доступ</Link>{" "}
        </Text>
        <Text className={styles.textSmall} type="small">
          Ще не маєте аккаунту? <Link to="/signup">Зареєструватися</Link>{" "}
        </Text>
      </Form>
    </MainLayout>
  );
};

export default LoginForm;
