import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { getFormData } from "../../../utils/getFormData";
import { useDeleteUser } from "./useDeleteUser";
import { useLogoutUser } from "./useLogout";
import { useUser } from "../../../hooks/useUser";
import { useBlobs } from "../../../hooks/useBlobs";
import Button from "../../common/Button/Button";
import FieldSet from "../FieldSet/FieldSet";
import Form from "../Form/Form";
import Input from "../../common/Input/Input";
import DropZone from "../../common/DropZone/DropZone";
import toast from "react-hot-toast";
import Modal from "../../block/Modal/Modal";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import BtnBlock from "../BtnBlock/BtnBlock";
import styles from "./AccountMain.module.scss";

const AccountMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm();

  const { user } = useUser(methods.setValue);
  const { pictures: avatar } = useBlobs(user?.avatar?.jpg ? [user?.avatar?.jpg] : [], [
    "user",
    "avatar",
    user?.id,
  ]);

  useEffect(() => {
    let fields = Object.keys(methods.getValues());
    fields.forEach((key) => key !== "password" && methods.setValue(key, user?.[key]));
  }, [user, methods]);

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
            <div className={styles.adminBlock}>
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
          </FieldSet>
          <FieldSet>
            <Input
              title={"Ваше ім'я"}
              register={methods.register("name")}
              style={{ textTransform: "capitalize" }}
              disabled={isLoading}
              errorMessage={errors?.name}
            />
            <Input
              title={"Ваше прізвище"}
              register={methods.register("lastName")}
              style={{ textTransform: "capitalize" }}
              disabled={isLoading}
              errorMessage={errors?.lastName}
            />
            <Input
              title={"Контактний телефон"}
              register={methods.register("phone")}
              disabled={isLoading}
              errorMessage={errors?.phone}
            />
            <Input
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
              type={"password"}
              title={"Старий пароль"}
              register={methods.register("oldPassword")}
              disabled={isLoading}
              errorMessage={errors?.oldPassword}
              onShow={() => setIsPassShow((state) => !state)}
              isShow={isPassShow}
            />
            <Input
              title={"Новий пароль"}
              type={"password"}
              register={methods.register("password")}
              disabled={isLoading}
              errorMessage={errors?.password}
              onShow={() => setIsNewPassShow((state) => !state)}
              isShow={isNewShow}
            />
            <Input
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

      <Form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Button onClick={logout} disabled={isLoadingOut}>
          Вийти з аккаунта
        </Button>
        <Button onClick={() => setIsModalOpen(true)} type={"outline-red"}>
          Видалити аккаунт
        </Button>
      </Form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        align="center"
        isLoading={isDeleting}
      >
        <Title align={"center"}>Ви впевнені?</Title>
        <Text align={"center"}>
          У разі видалення аккаунта ви більше не зможете його відновити. Всі дані з
          вашого профілю буде втрачено назавжди!
        </Text>
        <BtnBlock>
          <Button onClick={() => setIsModalOpen(false)}>Cкасувати</Button>
          <Button type={"outline-red"} onClick={deleteMe} disabled={isDeleting}>
            Видалити мій аккаунт
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default AccountMain;
