import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "./useForgotPassword";
import Picture from "../../common/Picture/Picture";
import Form from "../Form/Form";
import MainLayout from "../MainLayout/MainLayout";
import forgotPassImg from "../../../assets/forgotPassword.png";
import Input from "../../common/Input/Input";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";
import styles from "./ForgotPasswordBlock.module.scss";
import { prepareData } from "../../../utils/prepareData";

const ForgotPasswordBlock = () => {
  const { errors, isLoading, forgotPassword } = useForgotPassword();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const pathname = new URLSearchParams(location.search).get("next") || "/";

  async function onSubmit(data) {
    data["path"] = pathname;
    forgotPassword(prepareData(data));
  }

  return (
    <MainLayout>
      <div className={styles.inner}>
        <div className={styles.imgInner}>
          <Picture
            className={styles.img}
            formats={{ jpg: forgotPassImg }}
            alt={"Забули пароль?"}
          />
        </div>
        <div className={styles.formInner}>
          <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Title align={"center"}>Забули пароль?</Title>
            <Text align={"center"}>
              Вкажіть е-mail, на який зареєстровано Ваш аккаунт і ми надішлемо Вам листа
              з подальшими інструкціями
            </Text>

            <Input
              type={"email"}
              title={"Ваш e-mail*"}
              register={register("email")}
              errorMessage={errors?.email}
              disabled={isLoading}
            />
            <Button disabled={isLoading} className={styles.btn}>
              {isLoading ? <Loader /> : "Відновити доступ"}
            </Button>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPasswordBlock;
