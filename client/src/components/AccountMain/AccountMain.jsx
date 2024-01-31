import { FormProvider, useForm } from "react-hook-form";
import Button from "../common/Button/Button";
import FieldSet from "../common/FieldSet/FieldSet";
import Form from "../common/Form/Form";
import Input from "../common/Input/Input";
import { useAccountUser } from "./useAccountUser";
import DropZone from "../common/DropZone/DropZone";
import { useUpdateUser } from "./useUpdateUser";
import { getFormData } from "../../utils/getFormData";
import toast from "react-hot-toast";
import { useLogoutUser } from "./useLogout";
import Modal from "../common/Modal/Modal";
import { useState } from "react";
import Title from "../common/Title/Title";
import Text from "../common/Text/Text";
import { useDeleteUser } from "./useDeleteUser";

const AccountMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm();
  const { avatar, user } = useAccountUser(methods.setValue);
  const { logout, isLoading: isLoadingOut } = useLogoutUser();
  const { deleteMe, isLoading: isDeleting } = useDeleteUser();

  const [isPassShow, setIsPassShow] = useState(false);
  const [isNewShow, setIsNewPassShow] = useState(false);
  const [isConfirmPassShow, setIsConfirmPassShow] = useState(false);

  const { updateUser, isLoading, errors } = useUpdateUser();

  async function onDataChange(data) {
    updateUser(
      getFormData({
        name: data?.name,
        lastName: data?.lastName,
        phone: data?.phone,
        avatar: [data?.avatar?.[0]],
      })
    );
  }
  async function onPasswordChange(data) {
    if (data?.password != data?.passwordConfirm) {
      toast.error("Паролі не співпадають!");
    } else {
      updateUser({ password: data?.password, oldPassword: data?.oldPassword });
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onDataChange)}>
          {user?.role === "admin" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Title type={"small"}>Ви є одним з адміністраторів сайту.</Title>
              <Button asTag={"Link"} to={"/admin"}>
                До адмін-панелі
              </Button>
            </div>
          )}
          <FieldSet title={"Персональні дані"}>
            <DropZone
              maxPhotos={1}
              name={"avatar"}
              initialFiles={avatar}
              disabled={isLoading}
              errorMessage={errors?.avatar}
              title={"Фото профілю"}
            />
            <div></div>
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
          <Button disabled={isLoading}>Зберегти</Button>
        </Form>
      </FormProvider>

      <FormProvider>
        <Form onSubmit={methods.handleSubmit(onPasswordChange)}>
          <FieldSet title={"Зміна паролю"}>
            <Input
              name={"password"}
              type={"password"}
              title={"Старий пароль"}
              register={methods.register("oldPassword")}
              disabled={isLoading}
              errorMessage={errors?.oldPassword}
              onShow={() => setIsPassShow((state) => !state)}
              isShow={isPassShow}
            />
            <Input
              name={"password"}
              title={"Новий пароль"}
              type={"password"}
              register={methods.register("password")}
              disabled={isLoading}
              errorMessage={errors?.password}
              onShow={() => setIsNewPassShow((state) => !state)}
              isShow={isNewShow}
            />
            <Input
              name={"passwordConfirm"}
              type={"password"}
              title={"Підтвердження пароля"}
              register={methods.register("passwordConfirm")}
              disabled={isLoading}
              onShow={() => setIsConfirmPassShow((state) => !state)}
              isShow={isConfirmPassShow}
            />
          </FieldSet>
          <Button disabled={isLoading}>Змінити пароль</Button>
        </Form>
      </FormProvider>

      <Form
        onSubmit={(e) => e.preventDefault()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={logout} disabled={isLoadingOut}>
          Вийти з аккаунта
        </Button>
        <Button onClick={() => setIsModalOpen(true)} type={"outline-red"}>
          Видалити аккаунт
        </Button>
      </Form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Title align={"center"}>Ви впевнені?</Title>
          <Text align={"center"}>
            У разі видалення аккаунта ви більше не зможете його відновити. Всі дані з
            вашого профілю буде втрачено назавжди!
          </Text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={() => setIsModalOpen(false)}>Cкасувати</Button>
            <Button type={"outline-red"} onClick={deleteMe} disabled={isDeleting}>
              Видалити мій аккаунт
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountMain;
