import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { getFormData } from "../../../utils/getFormData";
import { useArticleOptions } from "../../../hooks/useArticleOptions";
import { useAddArticle } from "./useAddArticle";
import Form from "../Form/Form";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import Input from "../../common/Input/Input";
import FieldSet from "../FieldSet/FieldSet";
import InputSelect from "../../common/InputSelect/InputSelect";
import DropZone from "../../common/DropZone/DropZone";
import TextArea from "../../common/TextArea/TextArea";
import Loader from "../../common/Loader/Loader";
import TextEditor from "../../block/TextEditor/TextEditor";

const ArticleManageAdd = () => {
  const { options } = useArticleOptions();
  const methods = useForm();
  const editorRef = useRef(null);
  const { postArticle, isLoading, errors } = useAddArticle(methods.reset, editorRef);

  async function onSubmit(data) {
    postArticle(getFormData(data));
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Button asTag={"Link"} to={"/admin/articles"} type={"back"}>
          Назад
        </Button>

        <Title>Створення нової статті</Title>

        <FieldSet title={"Базова інформація"}>
          <Input
            type={"text"}
            title={"Назва статті*"}
            errorMessage={errors?.title}
            register={methods.register("title")}
            disabled={isLoading}
          />
          <InputSelect
            title={"Тема статті*"}
            placeholder={"Тема"}
            valuesArr={options?.topic}
            errorMessage={errors?.topic}
            name={"topic"}
            disabled={isLoading}
          />

          <DropZone
            title={"Головне зображення*"}
            errorMessage={errors?.imgCover}
            maxPhotos={1}
            name={"imgCover"}
            disabled={isLoading}
          />
          <TextArea
            title={"Короткий зміст*"}
            errorMessage={errors?.previewText}
            register={methods.register("previewText")}
            disabled={isLoading}
          />
        </FieldSet>

        <TextEditor
          title={"Контент статті*"}
          ref={editorRef}
          disabled={isLoading}
          imgName={() => methods.getValues()?.title}
        />

        <Button disabled={isLoading}>{isLoading ? <Loader /> : "Cтворити"}</Button>
      </Form>
    </FormProvider>
  );
};

export default ArticleManageAdd;
