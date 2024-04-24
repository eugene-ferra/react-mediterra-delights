import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCart } from "../../../hooks/useCart";
import { useManyProductsByIds } from "../../../hooks/useManyProductsByIds";
import { useOrderOptions } from "./useOrderOptions";
import { useCreateOrder } from "./useCreateOrder";
import { calcTotalDiscountPrice } from "../../../utils/calcTotalDiscountPrice";
import { calcTotalSum } from "../../../utils/calcTotalSum";
import { useUser } from "../../../hooks/useUser";
import OrderItem from "../../block/OrderItem/OrderItem";
import Container from "../Container/Container";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import FieldSet from "../FieldSet/FieldSet";
import Form from "../Form/Form";
import Input from "../../common/Input/Input";
import Loader from "../../common/Loader/Loader";
import Price from "../../common/Price/Price";
import RadioButton from "../../common/RadioButton/RadioButton";
import Text from "../../common/Text/Text";
import Title from "../../common/Title/Title";
import InputSelect from "../../common/InputSelect/InputSelect";
import Button from "../../common/Button/Button";
import DateInput from "../../common/DateInput/DateInput";
import PageLoader from "../PageLoader/PageLoader";
import styles from "./OrderBox.module.scss";

const OrderBox = () => {
  const methods = useForm();

  const { user } = useUser();
  useEffect(() => {
    let fields = Object.keys(methods.getValues());
    fields.forEach((key) => methods.setValue(key, user?.[key]));
  }, [user, methods]);

  const { cart, clearCart } = useCart();
  const { options, isLoading } = useOrderOptions();

  const {
    createOrder,
    createCheckout,
    isLoading: isCreating,
    errors,
  } = useCreateOrder(clearCart, methods.reset);

  const [deliveryType, setDeliveryType] = useState(options?.[0]);

  const {
    products,
    isLoading: isProductLoading,
    error: productError,
  } = useManyProductsByIds(cart?.map((item) => item?.id));

  async function onSubmit(data) {
    data["products"] = [...cart];

    if (data["deliveryType"] == options["deliveryType"][0]) {
      data["deliveryAddress"] = {};
    } else {
      data["pickupLocation"] = null;
    }

    if (data["paymentType"] == options["paymentType"][1]) {
      createCheckout(data);
    } else {
      createOrder(data);
    }
  }

  const totalDiscountPrice = calcTotalDiscountPrice(cart, products?.[1]);
  const totalSum = calcTotalSum(cart, products?.[1]);

  return (
    <>
      {(isProductLoading || isLoading) && <PageLoader />}

      {!isProductLoading && !isLoading && products && options && cart && (
        <Container>
          <Title type={"global"}>Оформлення замовлення</Title>
          {productError?.status && <ErrorMassage status={productError?.status} />}

          <div className={styles.inner}>
            <FormProvider {...methods}>
              <Form
                style={{ padding: 0, alignItems: "stretch" }}
                className={styles.form}
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <FieldSet title={"Ваші дані"}>
                  <Input
                    type={"text"}
                    title={"Ім'я*"}
                    register={methods.register("name")}
                    style={{ textTransform: "capitalize" }}
                    errorMessage={errors?.name}
                    disabled={isCreating}
                  />
                  <Input
                    type={"text"}
                    title={"Прізвище*"}
                    register={methods.register("lastName")}
                    style={{ textTransform: "capitalize" }}
                    errorMessage={errors?.lastName}
                    disabled={isCreating}
                  />
                  <Input
                    type={"text"}
                    title={"Телефон*"}
                    register={methods.register("phone")}
                    errorMessage={errors?.phone}
                    disabled={isCreating}
                  />
                  <Input
                    type={"text"}
                    title={"Email*"}
                    register={methods.register("email")}
                    errorMessage={errors?.email}
                    disabled={isCreating}
                  />
                </FieldSet>

                <FieldSet title={"Спосіб доставки"}>
                  {options?.deliveryType?.map((item) => (
                    <RadioButton
                      key={item}
                      value={item}
                      text={item}
                      name={"deliveryType"}
                      radioGroup={"deliveryType"}
                      onCheck={() => setDeliveryType(item)}
                      register={methods.register("deliveryType")}
                      errorMessage={errors?.deliveryType}
                      disabled={isCreating}
                    />
                  ))}
                  {deliveryType === options?.deliveryType[0] && (
                    <InputSelect
                      placeholder={"Пункт видачі"}
                      valuesArr={options?.pickupLocation}
                      name={"pickupLocation"}
                      errorMessage={errors?.pickupLocation}
                      disabled={isCreating}
                    />
                  )}
                  {deliveryType === options?.deliveryType[1] && (
                    <>
                      <Input
                        type={"text"}
                        title={"Вулиця*"}
                        register={methods.register("deliveryAddress.street")}
                        errorMessage={errors?.["deliveryAddress.street"]}
                        disabled={isCreating}
                      />
                      <Input
                        type={"text"}
                        title={"Будинок*"}
                        register={methods.register("deliveryAddress.home")}
                        errorMessage={errors?.["deliveryAddress.home"]}
                        disabled={isCreating}
                      />
                      <Input
                        type={"text"}
                        title={"Квартира"}
                        register={methods.register("deliveryAddress.flat")}
                        errorMessage={errors?.["deliveryAddress.flat"]}
                        disabled={isCreating}
                      />
                    </>
                  )}
                </FieldSet>
                <FieldSet title={"Час доставки/отримання"}>
                  <DateInput
                    name={"deliveryTime"}
                    errorMessage={errors?.deliveryTime}
                    disabled={isCreating}
                  />
                </FieldSet>
                <FieldSet title={"Спосіб оплати"}>
                  {options?.paymentType?.map((item) => (
                    <RadioButton
                      key={item}
                      name={"paymentType"}
                      text={item}
                      radioGroup={"paymentType"}
                      value={item}
                      register={methods.register("paymentType")}
                      errorMessage={errors?.paymentType}
                      disabled={isCreating}
                    />
                  ))}
                </FieldSet>

                <Button disabled={isCreating}>
                  {isCreating ? <Loader /> : "Підтверджую замовлення"}
                </Button>
              </Form>
            </FormProvider>

            <div className={styles.reciept}>
              <Title type={"small"}>Ваше замовлення</Title>
              <div className={styles.recieptItems}>
                {products?.[1]?.map((item) => (
                  <OrderItem
                    key={item?.id}
                    title={item?.title}
                    weight={item?.weight}
                    quantity={
                      cart?.find((cartItem) => item?.id == cartItem?.id)?.quantity
                    }
                    price={item?.price}
                    discountPrice={item?.discountPrice}
                  />
                ))}
              </div>
              <div className={styles.sum}>
                <Text type={"big"}>Загальна сума</Text>
                <Price discountPrice={totalDiscountPrice} price={totalSum} />
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default OrderBox;
