import { useOrderById } from "../../hooks/useOrderById";
import OrderFullItem from "../OrderFullItem/OrderFullItem";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Loader from "../common/Loader/Loader";
import Text from "../common/Text/Text";
import styles from "./OrderFullBlock.module.scss";

const OrderFullBlock = ({ id, isDropDown }) => {
  const { order, isLoading, isError, error } = useOrderById(id);

  return (
    <>
      {isError && id && <ErrorMassage status={error?.status} />}
      {isLoading && id && <Loader type={"global"} />}
      {!isError && order && (
        <div className={styles.order}>
          {isDropDown ? (
            <div>drop</div>
          ) : (
            <div>
              <div className={styles.header}>
                <Text type={"big"}>замовлення № {order?.[0]?.number}</Text>
                <Text type={"small"}>
                  {new Date(order?.[0]?.time).toLocaleString("uk-UA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </div>
              <Text>Cтатус: {order?.[0]?.status}</Text>
              <Text style={{ marginBottom: "10px" }}>
                Cтатус оплати: {order?.[0]?.isPayed ? "Оплачено" : "Не оплачено"}
              </Text>

              <div className={styles.body}>
                <div className={styles.products}>
                  {order?.[0]?.products?.map((item) => (
                    <OrderFullItem
                      key={item?.product?.id}
                      title={item?.product?.title}
                      weight={item?.product?.weight}
                      quantity={item?.quantity}
                      price={item.price}
                      img={item?.product?.imgCover}
                      id={item?.product?.slug}
                    />
                  ))}
                  <div className={styles.total}>
                    <Text type={"big"}>Всього:</Text>
                    <Text type={"big"}>{order?.[0]?.totalSum} грн</Text>
                  </div>
                </div>
                <div className={styles.orderInfo}>
                  <Text type={"small"}>
                    <strong>Спосіб оплати: </strong> {order?.[0]?.paymentType}
                  </Text>
                  <Text type={"small"}>
                    <strong>Спосіб доставки: </strong> {order?.[0]?.deliveryType}
                  </Text>

                  {order?.[0]?.pickupLocation ? (
                    <Text type={"small"}>
                      <strong>Пункт видачі</strong>: {order?.[0]?.pickupLocation}
                    </Text>
                  ) : (
                    <Text type={"small"}>
                      <strong>Адреса доставки</strong>:{" "}
                      {order?.[0]?.deliveryAddress?.street}, буд. №{" "}
                      {order?.[0]?.deliveryAddress?.home},
                      {order?.[0]?.deliveryAddress?.flat
                        ? ` кв. ${order?.[0]?.deliveryAddress?.flat}`
                        : ""}
                    </Text>
                  )}
                  <Text type={"small"}>
                    <strong>Час отримання</strong>:{" "}
                    {new Date(order?.[0]?.deliveryTime).toLocaleString("uk-UA", {
                      timeZone: "Etc/Greenwich",
                    })}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderFullBlock;
