import { useState } from "react";
import { useOrderById } from "../../hooks/useOrderById";
import OrderFullItem from "../OrderFullItem/OrderFullItem";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Loader from "../common/Loader/Loader";
import Text from "../common/Text/Text";
import styles from "./OrderFullBlock.module.scss";
import DropDownIcon from "../svg/DropDownIcon";

const OrderFullBlock = ({ id, isDropDown, isPersonalData }) => {
  const { order, isLoading, isError, error } = useOrderById(id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isError && id && <ErrorMassage status={error?.status} />}
      {isLoading && id && <Loader type={"global"} />}
      {!isError && order && (
        <div className={styles.order}>
          <div
            className={styles.header}
            onClick={isDropDown ? () => setIsOpen((state) => !state) : () => {}}
            style={isDropDown && { cursor: "pointer" }}
          >
            <div>
              <Text type={"big"}>Замовлення № {order?.[0]?.number}</Text>
              <Text type={"small"}>
                {new Date(order?.[0]?.time).toLocaleString("uk-UA", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </Text>
            </div>{" "}
            {isDropDown && (
              <div className={styles.headerDrop}>
                {!isOpen && (
                  <div>
                    <Text>Сума: {order?.[0]?.totalSum} грн</Text>
                  </div>
                )}
                <button
                  className={isOpen ? styles.dropClose : styles.drop}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((item) => !item);
                  }}
                >
                  <DropDownIcon />
                </button>
              </div>
            )}
          </div>

          {(isDropDown && isOpen) || !isDropDown ? (
            <>
              <div className={styles.mainData}>
                {isPersonalData && (
                  <div>
                    <Text className={styles.bold}>Контактні дані:</Text>
                    <Text>
                      Імя та прізвище: {""}
                      {order?.[0]?.name.charAt(0).toUpperCase()}
                      {order?.[0]?.name.slice(1)} {""}
                      {order?.[0]?.lastName.charAt(0).toUpperCase()}
                      {order?.[0]?.lastName.slice(1)}
                    </Text>

                    <Text>Телефон: {order?.[0]?.phone}</Text>
                    <Text>e-mail: {order?.[0]?.email}</Text>
                  </div>
                )}

                <div>
                  <Text className={styles.bold}>Поточний статус:</Text>
                  <Text>Cтатус: {order?.[0]?.status}</Text>
                  <Text style={{ marginBottom: "10px" }}>
                    Cтатус оплати: {order?.[0]?.isPayed ? "Оплачено" : "Не оплачено"}
                  </Text>
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.products}>
                  <Text className={styles.bold}>Страви:</Text>
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
            </>
          ) : (
            <></>
          )}
          {isDropDown && !isOpen ? <Text>{order?.[0]?.status}</Text> : null}
        </div>
      )}
    </>
  );
};

export default OrderFullBlock;
