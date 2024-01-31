import { useParams } from "react-router-dom";
import { useArticleOptions } from "../../hooks/useArticleOptions";
import { FormProvider, useForm } from "react-hook-form";
import { useAdminArticle } from "./useAdminArticle";
import Loader from "../common/Loader/Loader";
import Form from "../common/Form/Form";
import Button from "../common/Button/Button";
import Title from "../common/Title/Title";
import FieldSet from "../common/FieldSet/FieldSet";
import Input from "../common/Input/Input";
import InputSelect from "../common/InputSelect/Select";
import DropZone from "../common/DropZone/DropZone";
import TextArea from "../common/TextArea/TextArea";
import Text from "../common/Text/Text";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Editor from "../common/Editor/Editor";
import { useChangeArticle } from "./useChangeArticle";
import { getFormData } from "../../utils/getFormData";
import { useDeleteArticle } from "./useDeleteArticle";
import Modal from "../common/Modal/Modal";
import { useState } from "react";

const ArticleEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { options } = useArticleOptions();
  const methods = useForm();

  const {
    article,
    imgCover,
    isLoading: isArticleLoading,
  } = useAdminArticle(id, methods.setValue);

  const { isLoading, errors, patchArticle } = useChangeArticle();

  const { isLoading: isDeleting, deleteArticle } = useDeleteArticle();

  async function onSubmit(data) {
    if (!data?.markup.startsWith("<article>")) {
      data.markup = `<article>${data.markup}</article>`;
    }

    patchArticle({ id: id, data: getFormData(data) });
  }

  return (
    <>
      {isArticleLoading ? (
        <>
          <Loader type={"global"} />
        </>
      ) : article ? (
        <>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Button asTag={"Link"} to={"/admin/articles"} type={"back"}>
                Назад
              </Button>
              <Title>Редагувати статтю</Title>

              <FieldSet title={"Базова інформація"}>
                <Input
                  type={"text"}
                  name={"title"}
                  title={"Назва статті*"}
                  errorMessage={errors?.title}
                  register={methods.register("title")}
                  disabled={isLoading || isDeleting}
                />
                <InputSelect
                  title={"Тема статті*"}
                  valuesArr={options?.topic}
                  placeholder={article?.topic || "Тема"}
                  errorMessage={errors?.topic}
                  name={"topic"}
                  disabled={isLoading && isDeleting}
                />

                <DropZone
                  title={"Головне зображення*"}
                  errorMessage={errors?.imgCover}
                  maxPhotos={1}
                  name={"imgCover"}
                  initialFiles={imgCover}
                  disabled={isLoading || isDeleting}
                />
                <TextArea
                  name={"previewText"}
                  title={"Короткий зміст*"}
                  errorMessage={errors?.previewText}
                  register={methods.register("previewText")}
                  disabled={isLoading || isDeleting}
                />
              </FieldSet>
              <Editor
                name={"markup"}
                title={"Контент статті*"}
                defaultValue={article?.markup}
                errorText={errors?.markup}
                disabled={isLoading || isDeleting}
              />

              <Button disabled={isLoading}>{isLoading ? <Loader /> : "Оновити"}</Button>
            </Form>
          </FormProvider>

          <Form style={{ gap: "10px" }} onSubmit={(e) => e.preventDefault()}>
            <FieldSet title={"Видалення статті"}>
              <div>
                <Button
                  disabled={isDeleting}
                  type={"outline-red"}
                  style={{ marginTop: "10px" }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Видалити
                </Button>
              </div>
            </FieldSet>
          </Form>
        </>
      ) : (
        <ErrorMassage status={404} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Title align={"center"}>Ви впевнені?</Title>
          <Text align={"center"}>
            У разі видалення статті ви більше не зможете її відновити. Всі коментарі,
            лайки та перегляди будуть втрачені!
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
            <Button
              type={"outline-red"}
              onClick={() => deleteArticle(id)}
              disabled={isDeleting}
            >
              Так, видалити
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ArticleEdit;
