import { useState } from "react";
import { prettyTime } from "../../../utils/prettyTime";
import OrderFullItem from "../OrderFullItem/OrderFullItem";
import Text from "../../common/Text/Text";
import DropDownIcon from "../../svg/DropDownIcon";
import styles from "./OrderFullBlock.module.scss";

const OrderFullBlock = ({ order, isDropDown, isPersonalData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {order && (
        <div className={styles.order}>
          <div
            className={styles.header}
            onClick={isDropDown ? () => setIsOpen((state) => !state) : () => {}}
            style={isDropDown && { cursor: "pointer" }}
          >
            <div>
              <Text type={"big"}>Замовлення № {order?.number}</Text>
              <Text type={"small"}>{prettyTime(order?.time)}</Text>
            </div>
            {isDropDown && (
              <div className={styles.headerDrop}>
                {!isOpen && (
                  <div>
                    <Text>Сума: {order?.totalSum} грн</Text>
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
                      {order?.name.charAt(0).toUpperCase()}
                      {order?.name.slice(1)} {""}
                      {order?.lastName.charAt(0).toUpperCase()}
                      {order?.lastName.slice(1)}
                    </Text>

                    <Text>Телефон: {order?.phone}</Text>
                    <Text>e-mail: {order?.email}</Text>
                  </div>
                )}

                <div>
                  <Text className={styles.bold}>Поточний статус:</Text>
                  <Text>Cтатус: {order?.status}</Text>
                  <Text style={{ marginBottom: "10px" }}>
                    Cтатус оплати: {order?.isPayed ? "Оплачено" : "Не оплачено"}
                  </Text>
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.products}>
                  <Text className={styles.bold}>Страви:</Text>
                  {order?.products?.map((item) => (
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
                    <Text type={"big"}>Всього: {order?.totalSum} грн</Text>
                  </div>
                </div>
                <div className={styles.orderInfo}>
                  <Text type={"small"}>
                    <strong>Спосіб оплати: </strong> {order?.paymentType}
                  </Text>
                  <Text type={"small"}>
                    <strong>Спосіб доставки: </strong> {order?.deliveryType}
                  </Text>

                  {order?.pickupLocation ? (
                    <Text type={"small"}>
                      <strong>Пункт видачі</strong>: {order?.pickupLocation}
                    </Text>
                  ) : (
                    <Text type={"small"}>
                      <strong>Адреса доставки</strong>: {order?.deliveryAddress?.street},
                      буд. № {order?.deliveryAddress?.home},
                      {order?.deliveryAddress?.flat
                        ? ` кв. ${order?.deliveryAddress?.flat}`
                        : ""}
                    </Text>
                  )}
                  <Text type={"small"}>
                    <strong>Час отримання</strong>: {prettyTime(order?.deliveryTime)}
                  </Text>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {isDropDown && !isOpen ? <Text>{order?.status}</Text> : null}
        </div>
      )}
    </>
  );
};

export default OrderFullBlock;
