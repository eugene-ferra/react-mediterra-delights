import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useProductsOptions } from "../../../hooks/useProductOptions";
import { useChangeProduct } from "./useChangeProducts";
import { useAdminProduct } from "../ProductManage/useAdminProduct";
import { useParams } from "react-router-dom";
import { getFormData } from "../../../utils/getFormData";
import { useDeleteProduct } from "./useDeleteProduct";
import Title from "../../common/Title/Title";
import Button from "../../common/Button/Button";
import Form from "../Form/Form";
import FieldSet from "../FieldSet/FieldSet";
import Input from "../../common/Input/Input";
import InputSelect from "../../common/InputSelect/InputSelect";
import DropZone from "../../common/DropZone/DropZone";
import TextArea from "../../common/TextArea/TextArea";
import CheckBox from "../../common/CheckBox/CheckBox";
import Loader from "../../common/Loader/Loader";
import Text from "../../common/Text/Text";
import ErrorMessage from "../../common/ErrorMassage/ErrorMassage";
import Modal from "../../block/Modal/Modal";
import PageLoader from "../PageLoader/PageLoader";
import BtnBlock from "../BtnBlock/BtnBlock";

const ProductManageEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { options } = useProductsOptions();
  const methods = useForm();

  const {
    product,
    imgCover,
    pictures,
    isLoading: isProductLoading,
    error,
    isError,
  } = useAdminProduct(id, methods.setValue);

  const { isLoading, errors, patchProduct } = useChangeProduct();

  const { isLoading: isDeleting, deleteProduct } = useDeleteProduct();

  async function onSubmit(data) {
    patchProduct({ id: id, data: getFormData(data) });
  }

  return (
    <>
      {isError && <ErrorMessage status={error?.status} />}
      {isProductLoading && <PageLoader />}

      {product && (
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <Button asTag={"Link"} to={"/admin/products"} type={"back"}>
              Назад
            </Button>
            <Title>Редагувати продукт</Title>

            <FieldSet title={"Базова інформація"}>
              <Input
                type={"text"}
                title={"Назва товару*"}
                errorMessage={errors?.title}
                register={methods.register("title")}
                disabled={isLoading || isDeleting}
              />
              <InputSelect
                title={"Категорія товару*"}
                valuesArr={options?.categories}
                placeholder={product?.category || "Категорія"}
                errorMessage={errors?.category}
                register={methods.register("category")}
                name={"category"}
                disabled={isLoading || isDeleting}
              />
            </FieldSet>

            <FieldSet title={"Фото"}>
              <DropZone
                title={"Головне зображення*"}
                errorMessage={errors?.imgCover}
                maxPhotos={1}
                name={"imgCover"}
                disabled={isLoading || isDeleting}
                initialFiles={imgCover}
              />
              <DropZone
                title={"Всі зображення товару*"}
                errorMessage={errors?.images}
                maxPhotos={10}
                name={"images"}
                disabled={isLoading || isDeleting}
                initialFiles={pictures}
              />
            </FieldSet>

            <FieldSet title={"Детальна інформація"}>
              <TextArea
                title={"Опис товару*"}
                errorMessage={errors?.description}
                register={methods.register("description")}
                disabled={isLoading || isDeleting}
              />
              <TextArea
                title={"Повна інформація про товар"}
                errorMessage={errors?.fullText}
                register={methods.register("fullText")}
                disabled={isLoading || isDeleting}
              />
            </FieldSet>

            <FieldSet title={"Ціна"}>
              <Input
                type={"text"}
                title={"Ціна товару*"}
                errorMessage={errors?.price}
                register={methods.register("price")}
                disabled={isLoading || isDeleting}
              />
              <Input
                type={"text"}
                title={"Ціна зі товару зі знижкою"}
                errorMessage={errors?.discountPrice}
                register={methods.register("discountPrice")}
                disabled={isLoading || isDeleting}
              />
            </FieldSet>

            <FieldSet title={"Додаткова інформація"}>
              <Input
                type={"text"}
                title={"Вага товару*"}
                errorMessage={errors?.weight}
                register={methods.register("weight")}
                disabled={isLoading || isDeleting}
              />
              <Input
                type={"text"}
                title={"Час приготування товару*"}
                errorMessage={errors?.cookTime}
                register={methods.register("cookTime")}
                disabled={isLoading || isDeleting}
              />
            </FieldSet>

            <FieldSet title={"Нутрієнти"}>
              <Input
                type={"text"}
                title={"Калорії"}
                errorMessage={errors?.["nutrients.calories"]}
                register={methods.register("nutrients.calories")}
                disabled={isLoading || isDeleting}
              />
              <Input
                type={"text"}
                title={"Вуглеводи"}
                errorMessage={errors?.["nutrients.carbohydrates"]}
                register={methods.register("nutrients.carbohydrates")}
                disabled={isLoading || isDeleting}
              />
              <Input
                type={"text"}
                title={"Білки"}
                errorMessage={errors?.["nutrients.protein"]}
                register={methods.register("nutrients.protein")}
                disabled={isLoading || isDeleting}
              />
              <Input
                type={"text"}
                title={"Жири"}
                errorMessage={errors?.["nutrients.fats"]}
                register={methods.register("nutrients.fats")}
                disabled={isLoading || isDeleting}
              />
            </FieldSet>

            <FieldSet title={"Опції"}>
              <CheckBox
                name={"isVegan"}
                text={"Товар для вегетеріанців"}
                errorMessage={errors?.isVegan}
                register={methods.register("isVegan")}
                disabled={isLoading || isDeleting}
              />
              <CheckBox
                name={"isNewProduct"}
                text={"Помітити як новий"}
                errorMessage={errors?.isNewProduct}
                register={methods.register("isNewProduct")}
                disabled={isLoading || isDeleting}
              />
            </FieldSet>

            <Button disabled={isLoading}>{isLoading ? <Loader /> : "Зберегти"}</Button>
          </Form>

          <Form style={{ gap: "10px" }} onSubmit={(e) => e.preventDefault()}>
            <FieldSet title={"Видалення продукту"}>
              <div>
                <Text type={"normal"}>Ви справді хочете видалити цей продукт?</Text>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} align="center">
        <Title align={"center"}>Ви впевнені?</Title>
        <Text align={"center"}>
          У разі видалення страви ви більше не зможете її відновити. Всі відгуки, лайки
          та перегляди будуть втрачені!
        </Text>
        <BtnBlock>
          <Button onClick={() => setIsModalOpen(false)}>Cкасувати</Button>
          <Button
            type={"outline-red"}
            onClick={() => deleteProduct(id)}
            disabled={isDeleting}
          >
            Так, видалити
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default ProductManageEdit;
