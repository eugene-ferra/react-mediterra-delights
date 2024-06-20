import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWorkersOptions } from "../../../hooks/useWorkersOptions";
import { FormProvider, useForm } from "react-hook-form";
import { useWorker } from "../../../hooks/useWorker";
import { useBlobs } from "../../../hooks/useBlobs";
import { useChangeWorker } from "./useChangeWorker";
import { useDeleteWorker } from "./useDeleteWorker";
import { getFormData } from "../../../utils/getFormData";
import { prettyTime } from "../../../utils/prettyTime";
import Form from "../Form/Form";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import FieldSet from "../FieldSet/FieldSet";
import Input from "../../common/Input/Input";
import DateInput from "../../common/DateInput/DateInput";
import InputSelect from "../../common/InputSelect/InputSelect";
import DropZone from "../../common/DropZone/DropZone";
import TextArea from "../../common/TextArea/TextArea";
import Loader from "../../common/Loader/Loader";
import PageLoader from "../PageLoader/PageLoader";
import ErrorMessage from "../../common/ErrorMassage/ErrorMassage";
import Text from "../../common/Text/Text";
import Modal from "../../block/Modal/Modal";
import BtnBlock from "../BtnBlock/BtnBlock";

const WorkersManageEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { options } = useWorkersOptions();
  const methods = useForm();

  const { worker, isError, error, isLoading: isProductLoading } = useWorker(id);

  const { pictures: photo } = useBlobs(
    [worker?.photo?.jpg],
    ["adminWorker", "photo", id]
  );

  useEffect(() => {
    if (worker && options) {
      let fields = Object.keys(methods.getValues());
      fields.forEach((key) => methods.setValue(key, worker?.[key]));
    }
  }, [worker, methods, options]);

  const { changeWorker, isChanging, errors } = useChangeWorker(methods.reset);

  const { deleteWorker, isDeleting } = useDeleteWorker(methods.reset);

  async function onSubmit(data) {
    changeWorker({ id: id, data: getFormData(data) });
  }

  return (
    <>
      {isError && <ErrorMessage status={error?.status} />}
      {isProductLoading && <PageLoader />}

      {worker && (
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Button asTag={"Link"} to={"/admin/workers"} type={"back"}>
              Назад
            </Button>
            <Title>Редагувати дані робітника</Title>

            <FieldSet title={"Базова інформація"}>
              <Input
                type={"text"}
                title={"Ім'я*"}
                errorMessage={errors?.name}
                register={methods.register("name")}
                disabled={isChanging || isDeleting}
              />
              <Input
                type={"text"}
                title={"Прізвище*"}
                errorMessage={errors?.lastName}
                register={methods.register("lastName")}
                disabled={isChanging || isDeleting}
              />

              <DateInput
                title={"Дата народження*"}
                name={"dateOfBirth"}
                type={"year-month-day"}
                errorMessage={errors?.dateOfBirth}
                disabled={isChanging || isDeleting}
                placeholder={prettyTime(worker.dateOfBirth, {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              />

              <DateInput
                title={"Дата прийняття на роботу*"}
                name={"startWorkDate"}
                type={"year-month"}
                errorMessage={errors?.startWorkDate}
                disabled={isChanging || isDeleting}
                placeholder={prettyTime(worker.startWorkDate, {
                  month: "numeric",
                  year: "numeric",
                })}
              />

              <InputSelect
                title={"Категорія робітника*"}
                placeholder={worker.positionType || "Категорія"}
                valuesArr={options?.positionTypes}
                errorMessage={errors?.positionTypes}
                name={"positionType"}
                disabled={isChanging || isDeleting}
              />
              <Input
                type={"text"}
                title={"Посада*"}
                errorMessage={errors?.position}
                register={methods.register("position")}
                disabled={isChanging || isDeleting}
              />
            </FieldSet>

            <FieldSet title={"Детальна інформація"}>
              <DropZone
                title={"Фото працівника*"}
                errorMessage={errors?.photo}
                maxPhotos={1}
                name={"photo"}
                disabled={isChanging || isDeleting}
                initialFiles={photo || []}
              />
              <TextArea
                type={"text"}
                title={"Освіта та біографія*"}
                errorMessage={errors?.summary}
                register={methods.register("summary")}
                disabled={isChanging || isDeleting}
              />
              <TextArea
                type={"text"}
                title={"Додаткова інформація"}
                errorMessage={errors?.additionalInfo}
                register={methods.register("additionalInfo")}
                disabled={isChanging || isDeleting}
              />
            </FieldSet>

            <Button disabled={isChanging || isDeleting}>
              {isChanging ? <Loader /> : "Редагувати"}
            </Button>
          </Form>

          <Form style={{ gap: "10px" }} onSubmit={(e) => e.preventDefault()}>
            <FieldSet title={"Видалення продукту"}>
              <div>
                <Text type={"normal"}>Ви справді хочете видалити цього робітника?</Text>
                <Button
                  disabled={isDeleting}
                  type={"outline-red"}
                  style={{ marginTop: "10px" }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Так, видалити
                </Button>
              </div>
            </FieldSet>
          </Form>
        </FormProvider>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        align="center"
        isLoading={isDeleting}
      >
        <Title align={"center"}>Ви впевнені?</Title>
        <Text align={"center"}>
          У разі видалення робітника всі його дані будуть втрачені! Ви впевнені, що
          хочете видалити даного робітника?
        </Text>
        <BtnBlock>
          <Button onClick={() => setIsModalOpen(false)}>Cкасувати</Button>
          <Button
            type={"outline-red"}
            onClick={() => deleteWorker(id)}
            disabled={isDeleting}
          >
            Так, видалити
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default WorkersManageEdit;
