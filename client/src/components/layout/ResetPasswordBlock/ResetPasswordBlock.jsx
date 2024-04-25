import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { useResetPassword } from "./useResetPassword";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Text from "../../common/Text/Text";
import Title from "../../common/Title/Title";
import Form from "../Form/Form";
import MainLayout from "../MainLayout/MainLayout";
import Loader from "../../common/Loader/Loader";
import styles from "./ResetPasswordBlock.module.scss";

const ResetPasswordBlock = () => {
  const { errors, isLoading, resetPassword } = useResetPassword();
  const { register, handleSubmit } = useForm();
  const { token } = useParams();

  const location = useLocation();

  async function onSubmit(data) {
    data["email"] = new URLSearchParams(location.search).get("email");
    data["token"] = token;

    resetPassword(data);
  }

  return (
    <MainLayout>
      <div className={styles.formInner}>
        <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Title align={"center"}>Встановлення паролю</Title>
          <Text align={"center"}>
            Старий пароль від вашого аккаунту було скинуто. Будь-ласка, встановіть новий
            пароль для входу
          </Text>
          <Input
            title={"Новий пароль*"}
            register={register("password")}
            disabled={isLoading}
            errorMessage={errors?.password}
          />
          <Button disabled={isLoading} className={styles.btn}>
            {isLoading ? <Loader /> : "Зберегти і перейти до входу"}
          </Button>
        </Form>
      </div>
    </MainLayout>
  );
};

export default ResetPasswordBlock;
