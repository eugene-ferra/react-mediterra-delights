import "react-quill/dist/quill.snow.css";
import { useForm, FormProvider } from "react-hook-form";
import Form from "../common/Form/Form";
import Editor from "../common/Editor/Editor";
import { useArticleOptions } from "../../hooks/useArticleOptions";
import Button from "../common/Button/Button";
import Title from "../common/Title/Title";
import Input from "../common/Input/Input";
import FieldSet from "../common/FieldSet/FieldSet";
import InputSelect from "../common/InputSelect/Select";
import DropZone from "../common/DropZone/DropZone";
import TextArea from "../common/TextArea/TextArea";
import { usePostArticle } from "./usePostArticle";
import { getFormData } from "../../utils/getFormData";
import Loader from "../common/Loader/Loader";

const ArticleManageAdd = () => {
  const { options } = useArticleOptions();
  const methods = useForm();
  const { postArticle, isLoading, errors } = usePostArticle(methods.reset);

  async function onSubmit(data) {
    data?.markup
      ? (data.markup = `<article>${data.markup}</article>`)
      : (data["markup"] = undefined);

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
            name={"title"}
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
            name={"previewText"}
            title={"Короткий зміст*"}
            errorMessage={errors?.previewText}
            register={methods.register("previewText")}
            // disabled={isLoading}
          />
        </FieldSet>

        <Editor
          name={"markup"}
          title={"Контент статті*"}
          errorText={errors?.markup}
          disabled={isLoading}
        />

        <Button disabled={isLoading}>{isLoading ? <Loader /> : "Cтворити"}</Button>
      </Form>
    </FormProvider>
  );
};

export default ArticleManageAdd;
