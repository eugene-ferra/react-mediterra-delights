import Button from "../common/Button/Button";
import Form from "../common/Form/Form";
import Input from "../common/Input/Input";
import Title from "../common/Title/Title";
import { useProductsOptions } from "../../hooks/useProductOptions";

import { useState } from "react";
import InputSelect from "../common/InputSelect/Select";
import DropZone from "../common/DropZone/DropZone";
import TextArea from "../common/TextArea/TextArea";
import CheckBox from "../common/CheckBox/CheckBox";
import FieldSet from "../common/FieldSet/FieldSet";

const ProductManageAdd = () => {
  const { options } = useProductsOptions();

  return (
    <>
      <Form>
        <Title>Створення нового продукту</Title>

        <FieldSet title={"Базова інформація"}>
          <Input
            type={"text"}
            name={"title"}
            title={"Назва товару*"}
            errorMessage={""}
          />
          <InputSelect
            title={"Категорія товару*"}
            placeholder={"Категорія"}
            valuesArr={options?.categories}
            errorMessage={""}
          />
        </FieldSet>

        <FieldSet title={"Фото"}>
          <DropZone
            title={"Головне зображення*"}
            errorMessage={""}
            maxPhotos={1}
            name={"imgCover"}
          />
          <DropZone
            title={"Всі зображення товару*"}
            errorMessage={""}
            maxPhotos={10}
            name={"images"}
          />
        </FieldSet>

        <FieldSet title={"Детальна інформація"}>
          <TextArea name={"description"} title={"Опис товару*"} errorMessage={""} />
          <TextArea
            name={"description"}
            title={"Повна інформація про товар"}
            errorMessage={""}
          />
        </FieldSet>

        <FieldSet title={"Ціна"}>
          <Input
            type={"text"}
            name={"discountPrice"}
            title={"Ціна зі товару зі знижкою"}
            errorMessage={""}
          />
          <Input type={"text"} name={"price"} title={"Ціна товару*"} errorMessage={""} />
        </FieldSet>

        <FieldSet title={"Додаткова інформація"}>
          <Input
            type={"text"}
            name={"weight"}
            title={"Вага товару*"}
            errorMessage={""}
          />
          <Input
            type={"text"}
            name={"cookTime"}
            title={"Час приготування товару*"}
            errorMessage={""}
          />
        </FieldSet>

        <FieldSet title={"Нутрієнти"}>
          <Input type={"text"} name={"calories"} title={"Калорії"} errorMessage={""} />
          <Input
            type={"text"}
            name={"carbohydrates"}
            title={"Вуглеводи"}
            errorMessage={""}
          />
          <Input type={"text"} name={"protein"} title={"Білки"} errorMessage={""} />
          <Input type={"text"} name={"fats"} title={"Жири"} errorMessage={""} />
        </FieldSet>

        <FieldSet title={"Опції"}>
          <CheckBox
            name={"isVegan"}
            text={"Товар для вегетеріанців"}
            errorMessage={""}
          />
          <CheckBox name={"isNewProduct"} text={"Помітити як новий"} errorMessage={""} />
        </FieldSet>

        <Button>Cтворити</Button>
      </Form>
    </>
  );
};

export default ProductManageAdd;
