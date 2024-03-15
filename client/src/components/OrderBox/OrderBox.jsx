import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useManyProductsByIds } from "../../hooks/useManyProductsByIds";
import OrderItem from "../OrderItem/OrderItem";
import Container from "../common/Container/Container";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import FieldSet from "../common/FieldSet/FieldSet";
import Form from "../common/Form/Form";
import Input from "../common/Input/Input";
import Loader from "../common/Loader/Loader";
import Price from "../common/Price/Price";
import RadioButton from "../common/RadioButton/RadioButton";
import Text from "../common/Text/Text";
import Title from "../common/Title/Title";
import styles from "./OrderBox.module.scss";
import { useOrderOptions } from "./useOrderOptions";
import InputSelect from "../common/InputSelect/Select";
import { FormProvider, useForm } from "react-hook-form";
import DateInput from "../common/DateInput/DateInput";
import Button from "../common/Button/Button";
import { useCreateOrder } from "./useCreateOrder";
import { useUserData } from "./useUserData";

const OrderBox = () => {
  const methods = useForm();
  useUserData(methods.setValue);

  const { cart, clearCart } = useCart();
  const { options, isLoading } = useOrderOptions();

  const {
    createOrder,
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
    createOrder(data);
  }

  const totalDiscountPrice = !isProductLoading
    ? cart?.reduce((acc, item) => {
        const product = products?.find((p) => p.id === item.id);
        if (product) {
          const price = product.discountPrice || product?.price;
          acc += price * item.quantity;
        }
        return acc;
      }, 0)
    : 0;

  const totalSum = !isProductLoading
    ? cart?.reduce((acc, item) => {
        const product = products?.find((p) => p.id === item.id);
        if (product) {
          const price = product.price;
          acc += price * item.quantity;
        }
        return acc;
      }, 0)
    : 0;

  return (
    <>
      {isProductLoading || isLoading ? (
        <Container>
          <Loader type={"global"} />
        </Container>
      ) : (
        <Container>
          <Title type={"global"}>Оформлення замовлення</Title>
          {productError[0]?.status && <ErrorMassage status={productError?.status} />}

          <div className={styles.inner}>
            <FormProvider {...methods}>
              <Form
                style={{ padding: 0 }}
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

                <Button>{isCreating ? <Loader /> : "Підтверджую замовлення"}</Button>
              </Form>
            </FormProvider>

            <div className={styles.reciept}>
              <Title type={"small"}>Ваше замовлення</Title>
              <div className={styles.recieptItems}>
                {products?.map((item) => (
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
