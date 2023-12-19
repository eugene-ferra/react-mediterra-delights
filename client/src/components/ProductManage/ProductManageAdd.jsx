import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import Input from "../common/Input/Input";
import Title from "../common/Title/Title";
import { useProductsOptions } from "../../hooks/useProductOptions";
import InputSelect from "../common/InputSelect/Select";
import DropZone from "../common/DropZone/DropZone";
import TextArea from "../common/TextArea/TextArea";
import CheckBox from "../common/CheckBox/CheckBox";
import FieldSet from "../common/FieldSet/FieldSet";
import { useForm, FormProvider } from "react-hook-form";
import { usePostProduct } from "./usePostProduct";
import { getFormData } from "../../utils/getFormData";

const ProductManageAdd = () => {
  const { options } = useProductsOptions();
  const methods = useForm();
  const { postProduct, isLoading, errors } = usePostProduct();

  async function onSubmit(data) {
    postProduct(getFormData(data));
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Title>Створення нового продукту</Title>

          <FieldSet title={"Базова інформація"}>
            <Input
              type={"text"}
              name={"title"}
              title={"Назва товару*"}
              errorMessage={errors?.title}
              register={methods.register("title")}
            />
            <InputSelect
              title={"Категорія товару*"}
              placeholder={"Категорія"}
              valuesArr={options?.categories}
              errorMessage={errors?.category}
              name={"category"}
            />
          </FieldSet>

          <FieldSet title={"Фото"}>
            <DropZone
              title={"Головне зображення*"}
              errorMessage={errors?.imgCover}
              maxPhotos={1}
              name={"imgCover"}
            />
            <DropZone
              title={"Всі зображення товару*"}
              errorMessage={errors?.images}
              maxPhotos={10}
              name={"images"}
            />
          </FieldSet>

          <FieldSet title={"Детальна інформація"}>
            <TextArea
              name={"description"}
              title={"Опис товару*"}
              errorMessage={errors?.description}
              register={methods.register("description")}
            />
            <TextArea
              name={"fullText"}
              title={"Повна інформація про товар"}
              errorMessage={errors?.fullText}
              register={methods.register("fullText")}
            />
          </FieldSet>

          <FieldSet title={"Ціна"}>
            <Input
              type={"text"}
              name={"price"}
              title={"Ціна товару*"}
              errorMessage={errors?.price}
              register={methods.register("price")}
            />
            <Input
              type={"text"}
              name={"discountPrice"}
              title={"Ціна зі товару зі знижкою"}
              errorMessage={errors?.discountPrice}
              register={methods.register("discountPrice")}
            />
          </FieldSet>

          <FieldSet title={"Додаткова інформація"}>
            <Input
              type={"text"}
              name={"weight"}
              title={"Вага товару*"}
              errorMessage={errors?.weight}
              register={methods.register("weight")}
            />
            <Input
              type={"text"}
              name={"cookTime"}
              title={"Час приготування товару*"}
              errorMessage={errors?.cookTime}
              register={methods.register("cookTime")}
            />
          </FieldSet>

          <FieldSet title={"Нутрієнти"}>
            <Input
              type={"text"}
              name={"calories"}
              title={"Калорії"}
              errorMessage={errors?.["nutrients.calories"]}
              register={methods.register("nutrients.calories")}
            />
            <Input
              type={"text"}
              name={"carbohydrates"}
              title={"Вуглеводи"}
              errorMessage={errors?.["nutrients.carbohydrates"]}
              register={methods.register("nutrients.carbohydrates")}
            />
            <Input
              type={"text"}
              name={"protein"}
              title={"Білки"}
              errorMessage={errors?.["nutrients.protein"]}
              register={methods.register("nutrients.protein")}
            />
            <Input
              type={"text"}
              name={"fats"}
              title={"Жири"}
              errorMessage={errors?.["nutrients.fats"]}
              register={methods.register("nutrients.fats")}
            />
          </FieldSet>

          <FieldSet title={"Опції"}>
            <CheckBox
              name={"isVegan"}
              text={"Товар для вегетеріанців"}
              errorMessage={errors?.isVegan}
              register={methods.register("isVegan")}
            />
            <CheckBox
              name={"isNewProduct"}
              text={"Помітити як новий"}
              errorMessage={errors?.isNewProduct}
              register={methods.register("isNewProduct")}
            />
          </FieldSet>

          <Button>Cтворити</Button>
        </Form>
      </FormProvider>
    </>
  );
};

export default ProductManageAdd;
