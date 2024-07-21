import { useProductsOptions } from "../../../hooks/useProductOptions";
import { useForm, FormProvider } from "react-hook-form";
import { useAddProduct } from "./useAddProduct";
import { getFormData } from "../../../utils/getFormData";
import Button from "../../common/Button/Button";
import Form from "../Form/Form";
import Input from "../../common/Input/Input";
import Title from "../../common/Title/Title";
import InputSelect from "../../common/InputSelect/InputSelect";
import DropZone from "../../common/DropZone/DropZone";
import TextArea from "../../common/TextArea/TextArea";
import CheckBox from "../../common/CheckBox/CheckBox";
import FieldSet from "../FieldSet/FieldSet";
import Loader from "../../common/Loader/Loader";

const ProductManageAdd = () => {
  const { options } = useProductsOptions();
  const methods = useForm();

  const { addProduct, isAdding, errors } = useAddProduct(methods.reset);

  async function onSubmit(data) {
    addProduct(getFormData(data));
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Button asTag={"Link"} to={"/admin/products"} type={"back"}>
            Назад
          </Button>
          <Title>Створення нового продукту</Title>

          <FieldSet title={"Базова інформація"}>
            <Input
              type={"text"}
              title={"Назва товару*"}
              errorMessage={errors?.title}
              register={methods.register("title")}
              disabled={isAdding}
            />
            <InputSelect
              title={"Категорія товару*"}
              placeholder={"Категорія"}
              valuesArr={options?.categories}
              errorMessage={errors?.category}
              name={"category"}
              disabled={isAdding}
            />
          </FieldSet>

          <FieldSet title={"Фото"}>
            <DropZone
              title={"Головне зображення*"}
              errorMessage={errors?.imgCover}
              maxPhotos={1}
              name={"imgCover"}
              disabled={isAdding}
              initialFiles={methods.getValues()?.imgCover || []}
            />
            <DropZone
              title={"Всі зображення товару*"}
              errorMessage={errors?.images}
              maxPhotos={10}
              name={"images"}
              disabled={isAdding}
              initialFiles={methods.getValues()?.images || []}
            />
          </FieldSet>

          <FieldSet title={"Детальна інформація"}>
            <TextArea
              title={"Опис товару*"}
              errorMessage={errors?.description}
              register={methods.register("description")}
              disabled={isAdding}
            />
            <TextArea
              title={"Повна інформація про товар"}
              errorMessage={errors?.fullText}
              register={methods.register("fullText")}
              disabled={isAdding}
            />
          </FieldSet>

          <FieldSet title={"Ціна"}>
            <Input
              type={"text"}
              title={"Ціна товару*"}
              errorMessage={errors?.price}
              register={methods.register("price")}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Ціна зі товару зі знижкою"}
              errorMessage={errors?.discountPrice}
              register={methods.register("discountPrice")}
              disabled={isAdding}
            />
          </FieldSet>

          <FieldSet title={"Додаткова інформація"}>
            <Input
              type={"text"}
              title={"Вага товару*"}
              errorMessage={errors?.weight}
              register={methods.register("weight")}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Час приготування товару*"}
              errorMessage={errors?.cookTime}
              register={methods.register("cookTime")}
              disabled={isAdding}
            />
          </FieldSet>

          <FieldSet title={"Нутрієнти"}>
            <Input
              type={"text"}
              title={"Калорії"}
              errorMessage={errors?.["nutrients.calories"]}
              register={methods.register("nutrients.calories")}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Вуглеводи"}
              errorMessage={errors?.["nutrients.carbohydrates"]}
              register={methods.register("nutrients.carbohydrates")}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Білки"}
              errorMessage={errors?.["nutrients.protein"]}
              register={methods.register("nutrients.protein")}
              disabled={isAdding}
            />
            <Input
              type={"text"}
              title={"Жири"}
              errorMessage={errors?.["nutrients.fats"]}
              register={methods.register("nutrients.fats")}
              disabled={isAdding}
            />
          </FieldSet>

          <FieldSet title={"Опції"}>
            <CheckBox
              name={"isVegan"}
              text={"Товар для вегетеріанців"}
              errorMessage={errors?.isVegan}
              register={methods.register("isVegan")}
              disabled={isAdding}
            />
            <CheckBox
              name={"isNewProduct"}
              text={"Помітити як новий"}
              errorMessage={errors?.isNewProduct}
              register={methods.register("isNewProduct")}
              disabled={isAdding}
            />
          </FieldSet>

          <Button disabled={isAdding}>{isAdding && <Loader />} Cтворити</Button>
        </Form>
      </FormProvider>
    </>
  );
};

export default ProductManageAdd;
