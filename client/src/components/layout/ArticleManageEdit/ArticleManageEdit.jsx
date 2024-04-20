import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useArticleOptions } from "../../../hooks/useArticleOptions";
import { FormProvider, useForm } from "react-hook-form";
import { useAdminArticle } from "../ArticleManage/useAdminArticle";
import { useChangeArticle } from "./useChangeArticle";
import { getFormData } from "../../../utils/getFormData";
import { useDeleteArticle } from "./useDeleteArticle";
import Loader from "../../common/Loader/Loader";
import Form from "../Form/Form";
import Button from "../../common/Button/Button";
import Title from "../../common/Title/Title";
import FieldSet from "../FieldSet/FieldSet";
import Input from "../../common/Input/Input";
import InputSelect from "../../common/InputSelect/InputSelect";
import DropZone from "../../common/DropZone/DropZone";
import TextArea from "../../common/TextArea/TextArea";
import Text from "../../common/Text/Text";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import Modal from "../../block/Modal/Modal";
import TextEditor from "../../block/TextEditor/TextEditor";
import PageLoader from "../PageLoader/PageLoader";
import BtnBlock from "../BtnBlock/BtnBlock";

const ArticleManageEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { options } = useArticleOptions();
  const methods = useForm();

  const editorRef = useRef(null);

  const {
    article,
    imgCover,
    isLoading: isArticleLoading,
    isError,
  } = useAdminArticle(id, methods.setValue);

  const { isLoading, errors, patchArticle } = useChangeArticle(editorRef);

  const { isLoading: isDeleting, deleteArticle } = useDeleteArticle();

  async function onSubmit(data) {
    patchArticle({ id: id, data: getFormData(data) });
  }

  return (
    <>
      {isError && <ErrorMassage status={404} />}
      {isArticleLoading && <PageLoader />}

      {article && (
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Button asTag={"Link"} to={"/admin/articles"} type={"back"}>
              Назад
            </Button>
            <Title>Редагувати статтю</Title>

            <FieldSet title={"Базова інформація"}>
              <Input
                type={"text"}
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

            <TextEditor
              title={"Контент статті*"}
              ref={editorRef}
              disabled={isLoading || isDeleting}
              initialValue={article?.markup}
              imgName={() => methods.getValues()?.title}
            />

            <Button disabled={isLoading || isDeleting}>
              {isLoading ? <Loader /> : "Оновити"}
            </Button>
          </Form>

          <Form style={{ gap: "10px" }} onSubmit={(e) => e.preventDefault()}>
            <Button
              disabled={isDeleting || isLoading}
              type={"outline-red"}
              onClick={() => setIsModalOpen(true)}
            >
              Видалити статтю
            </Button>
          </Form>
        </FormProvider>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} align="center">
        <Title align={"center"}>Ви впевнені?</Title>
        <Text align={"center"}>
          У разі видалення статті ви більше не зможете її відновити. Всі коментарі, лайки
          та перегляди будуть втрачені!
        </Text>
        <BtnBlock>
          <Button onClick={() => setIsModalOpen(false)}>Cкасувати</Button>
          <Button
            type={"outline-red"}
            onClick={() => deleteArticle(id)}
            disabled={isDeleting}
          >
            Так, видалити
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default ArticleManageEdit;
