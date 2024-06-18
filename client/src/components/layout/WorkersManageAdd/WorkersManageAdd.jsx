import { FormProvider, useForm } from "react-hook-form";
import { useAddWorker } from "./useAddWorker";
import { getFormData } from "../../../utils/getFormData";
import { useWorkersOptions } from "../../../hooks/useWorkersOptions";
import Form from "../Form/Form";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import FieldSet from "../FieldSet/FieldSet";
import Input from "../../common/Input/Input";
import DateInput from "../../common/DateInput/DateInput";
import TextArea from "../../common/TextArea/TextArea";
import InputSelect from "../../common/InputSelect/InputSelect";
import DropZone from "../../common/DropZone/DropZone";
import Loader from "../../common/Loader/Loader";

const WorkersManageAdd = () => {
  const { options } = useWorkersOptions();

  const methods = useForm();
  const { addWorker, isAdding, errors } = useAddWorker(methods.reset);

  async function onSubmit(data) {
    addWorker(getFormData(data));
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Button asTag={"Link"} to={"/admin/workers"} type={"back"}>
            Назад
          </Button>
          <Title>Додавання нового робітника</Title>

          <FieldSet title={"Базова інформація"}>
            <Input
              type={"text"}
              title={"Ім'я*"}
              errorMessage={errors?.name}
              register={methods.register("name")}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Прізвище*"}
              errorMessage={errors?.lastName}
              register={methods.register("lastName")}
              disabled={isAdding}
            />

            <DateInput
              title={"Дата народження*"}
              name={"dateOfBirth"}
              type={"year-month-day"}
              errorMessage={errors?.dateOfBirth}
              disabled={isAdding}
            />

            <DateInput
              title={"Дата прийняття на роботу*"}
              name={"startWorkDate"}
              type={"year-month"}
              errorMessage={errors?.startWorkDate}
              disabled={isAdding}
            />

            <InputSelect
              title={"Категорія робітника*"}
              placeholder={"Категорія"}
              valuesArr={options?.positionTypes}
              errorMessage={errors?.positionTypes}
              name={"positionType"}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Посада*"}
              errorMessage={errors?.position}
              register={methods.register("position")}
              disabled={isAdding}
            />
          </FieldSet>

          <FieldSet title={"Детальна інформація"}>
            <DropZone
              title={"Фото працівника*"}
              errorMessage={errors?.photo}
              maxPhotos={1}
              name={"photo"}
              disabled={isAdding}
              initialFiles={methods.getValues()?.photo || []}
            />
            <TextArea
              type={"text"}
              title={"Освіта та біографія*"}
              errorMessage={errors?.summary}
              register={methods.register("summary")}
              disabled={isAdding}
            />
            <TextArea
              type={"text"}
              title={"Додаткова інформація"}
              errorMessage={errors?.additionalInfo}
              register={methods.register("additionalInfo")}
              disabled={isAdding}
            />
          </FieldSet>

          <Button disabled={isAdding}>{isAdding ? <Loader /> : "Cтворити"}</Button>
        </Form>
      </FormProvider>
    </>
  );
};

export default WorkersManageAdd;
