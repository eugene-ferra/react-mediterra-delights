import Input from "../common/Input/Input";
import Title from "../common/Title/Title";
import Text from "../common/Text/Text";
import styles from "./SignUpForm.module.scss";
import Form from "../common/Form/Form";
import MainLayout from "../MainLayout/MainLayout";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister } from "./useRegister";
import Loader from "../common/Loader/Loader";

const SignUpForm = () => {
  const { signup, isLoading, errors } = useRegister();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    signup(data);
  }

  return (
    <MainLayout className={styles.layout}>
      <Form className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <Title align={"center"}>Реєстрація</Title>
        <Text align={"center"}>
          Вітаємо Вас на нашому сайті! Для реєстрації заповніть поля нижче
        </Text>
        <Input
          title={"Ім'я*"}
          type={"text"}
          placeholder={"Іван"}
          name={"name"}
          errorMessage={errors?.name}
          register={register("name")}
          disabled={isLoading}
        />
        <Input
          title={"Прізвище*"}
          type={"text"}
          placeholder={"Іванов"}
          name={"lastname"}
          errorMessage={errors?.lastName}
          register={register("lastName")}
          disabled={isLoading}
        />
        <Input
          title={"Електронна пошта*"}
          type={"email"}
          placeholder={"example@domain.com"}
          name={"email"}
          errorMessage={errors?.email}
          register={register("email")}
          disabled={isLoading}
        />

        <Input
          type={"password"}
          title={"Пароль*"}
          name={"password"}
          errorMessage={errors?.password}
          register={register("password")}
          disabled={isLoading}
        />
        <Button disabled={isLoading} style={{ width: "100%" }}>
          {isLoading ? <Loader /> : "Реєстрація"}
        </Button>
        <Text type="small" align={"center"}>
          Вже маєте аккаунт? <Link to="/login">Увійти в аккаунт</Link>{" "}
        </Text>
      </Form>
    </MainLayout>
  );
};

export default SignUpForm;
