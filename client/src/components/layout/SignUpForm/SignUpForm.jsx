import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRegister } from "./useRegister";
import { useForm } from "react-hook-form";
import Input from "../../common/Input/Input";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import Form from "../Form/Form";
import MainLayout from "../MainLayout/MainLayout";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";
import styles from "./SignUpForm.module.scss";

const SignUpForm = () => {
  const [isPassShow, setIsPassShow] = useState(false);

  const { signup, isLoading, errors } = useRegister();
  const { register, handleSubmit } = useForm();

  const location = useLocation();

  const pathname = new URLSearchParams(location?.search).get("next") || "/";

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
          errorMessage={errors?.name}
          register={register("name")}
          disabled={isLoading}
        />
        <Input
          title={"Прізвище*"}
          type={"text"}
          placeholder={"Іванов"}
          errorMessage={errors?.lastName}
          register={register("lastName")}
          disabled={isLoading}
        />
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
        <Button disabled={isLoading} style={{ width: "100%" }}>
          {isLoading ? <Loader /> : "Реєстрація"}
        </Button>
        <Text type="small" align={"center"}>
          Вже маєте аккаунт? <Link to={`/login?next=${pathname}`}>Увійти в аккаунт</Link>
        </Text>
      </Form>
    </MainLayout>
  );
};

export default SignUpForm;
