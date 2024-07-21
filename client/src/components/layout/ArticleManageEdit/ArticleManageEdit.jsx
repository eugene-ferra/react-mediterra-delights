import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useArticleOptions } from "../../../hooks/useArticleOptions";
import { FormProvider, useForm } from "react-hook-form";
import { useChangeArticle } from "./useChangeArticle";
import { getFormData } from "../../../utils/getFormData";
import { useDeleteArticle } from "./useDeleteArticle";
import { useBlobs } from "../../../hooks/useBlobs";
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
import { useArticle } from "../../../hooks/useArticle";

const ArticleManageEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { options } = useArticleOptions();
  const methods = useForm();

  const editorRef = useRef(null);

  const { article, isLoading, isError } = useArticle(id);

  const { pictures: imgCover } = useBlobs(
    [article?.imgCover?.jpg],
    ["adminArticle", "imgCover", id]
  );

  useEffect(() => {
    if (article && options) {
      let fields = Object.keys(methods.getValues());
      fields.forEach((key) => methods.setValue(key, article?.[key]));
    }
  }, [methods, article, options]);

  const { isChanging, errors, patchArticle } = useChangeArticle(editorRef);

  const { isDeleting, deleteArticle } = useDeleteArticle();

  async function onSubmit(data) {
    patchArticle({ id: id, data: getFormData(data) });
  }

  return (
    <>
      {isError && <ErrorMassage status={404} />}
      {isLoading && <PageLoader />}

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
                disabled={isChanging || isDeleting}
              />
              <InputSelect
                title={"Тема статті*"}
                valuesArr={options?.topic}
                placeholder={article?.topic || "Тема"}
                errorMessage={errors?.topic}
                name={"topic"}
                disabled={isChanging && isDeleting}
              />

              <DropZone
                title={"Головне зображення*"}
                errorMessage={errors?.imgCover}
                maxPhotos={1}
                name={"imgCover"}
                initialFiles={imgCover}
                disabled={isChanging || isDeleting}
              />
              <TextArea
                name={"previewText"}
                title={"Короткий зміст*"}
                errorMessage={errors?.previewText}
                register={methods.register("previewText")}
                disabled={isChanging || isDeleting}
              />
            </FieldSet>

            <TextEditor
              title={"Контент статті*"}
              ref={editorRef}
              disabled={isChanging || isDeleting}
              initialValue={article?.markup}
              imgName={() => methods.getValues()?.title}
            />

            <Button disabled={isChanging || isDeleting}>
              {isChanging && <Loader />} Оновити
            </Button>
          </Form>

          <Form style={{ gap: "10px" }} onSubmit={(e) => e.preventDefault()}>
            <Button
              disabled={isDeleting || isChanging}
              type={"outline-red"}
              onClick={() => setIsModalOpen(true)}
            >
              Видалити статтю
            </Button>
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
