import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import Button from "../common/Button/Button";
import FieldSet from "../common/FieldSet/FieldSet";
import Form from "../common/Form/Form";
import Input from "../common/Input/Input";
import { useAccountUser } from "./useAccountUser";
import DropZone from "../common/DropZone/DropZone";
import { useUpdateUser } from "./useUpdateUser";
import { getFormData } from "../../utils/getFormData";
import toast from "react-hot-toast";

const AccountMain = () => {
  const methods = useForm();
  const { avatar } = useAccountUser(methods.setValue);

  const { updateUser, isLoading, errors } = useUpdateUser();

  async function onDataChange(data) {
    updateUser({ name: data?.name, lastName: data?.lastName, phone: data?.phone });
  }
  async function onPasswordChange(data) {
    if (data?.password != data?.passwordConfirm) {
      toast.error("Паролі не співпадають!");
    } else {
      updateUser({ password: data?.password, oldPassword: data?.oldPassword });
    }
  }
  async function onAvatarChange(data) {
    updateUser(getFormData({ avatar: [data?.avatar?.[0]] }));
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onAvatarChange)}>
          <FieldSet title={"Фото профілю"}>
            <DropZone
              maxPhotos={1}
              name={"avatar"}
              initialFiles={avatar}
              disabled={isLoading}
              errorMessage={errors?.avatar}
            />
          </FieldSet>
          <Button>Зберегти</Button>
        </Form>
      </FormProvider>

      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onDataChange)}>
          <FieldSet title={"Контактні дані"}>
            <Input
              name={"name"}
              title={"Ваше ім'я"}
              register={methods.register("name")}
              style={{ textTransform: "capitalize" }}
              disabled={isLoading}
              errorMessage={errors?.name}
            />
            <Input
              name={"lastName"}
              title={"Ваше прізвище"}
              register={methods.register("lastName")}
              style={{ textTransform: "capitalize" }}
              disabled={isLoading}
              errorMessage={errors?.lastName}
            />
            <Input
              name={"phone"}
              title={"Контактний телефон"}
              register={methods.register("phone")}
              disabled={isLoading}
              errorMessage={errors?.phone}
            />
            <Input
              name={"email"}
              title={"Ваш e-mail"}
              disabled={true}
              register={methods.register("email")}
            />
          </FieldSet>
          <Button>Зберегти</Button>
        </Form>
      </FormProvider>

      <FormProvider>
        <Form onSubmit={methods.handleSubmit(onPasswordChange)}>
          <FieldSet title={"Зміна паролю"}>
            <Input
              name={"password"}
              title={"Старий пароль"}
              register={methods.register("oldPassword")}
              disabled={isLoading}
              errorMessage={errors?.oldPassword}
            />
            <Input
              name={"password"}
              title={"Новий пароль"}
              register={methods.register("password")}
              disabled={isLoading}
              errorMessage={errors?.password}
            />
            <Input
              name={"passwordConfirm"}
              title={"Підтвердження пароля"}
              register={methods.register("passwordConfirm")}
              disabled={isLoading}
            />
          </FieldSet>
          <Button>Змінити пароль</Button>
        </Form>
      </FormProvider>
    </>
  );
};

export default AccountMain;
