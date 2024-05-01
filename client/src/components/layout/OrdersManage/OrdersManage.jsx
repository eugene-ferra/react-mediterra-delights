import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrderOptions } from "../OrderBox/useOrderOptions";
import { useOrders } from "../../../hooks/useOrders";
import OrderFullBlock from "../../block/OrderFullBlock/OrderFullBlock";
import Pagination from "../../block/Pagination/Pagination";
import PageLoader from "../PageLoader/PageLoader";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import ManageItem from "../ManageItem/ManageItem";
import Text from "../../common/Text/Text";
import Modal from "../../block/Modal/Modal";
import Filters from "../Filters/Filters";
import BtnBlock from "../BtnBlock/BtnBlock";
import Button from "../../common/Button/Button";
import styles from "./OrdersManage.module.scss";
import { prettyTime } from "../../../utils/prettyTime";

const OrdersManage = () => {
  const { options, isLoading } = useOrderOptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    orders,
    isLoading: isOrdersLoading,
    error,
  } = useOrders(`${searchParams.toString()}&limit=5&sort=time`);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const onClick = (id) => {
    setCurrentOrder(id);
    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <PageLoader />}

      {!isLoading && options && (
        <Filters
          filters={[
            {
              title: "Неопрацьовані",
              filter: () => setSearchParams({ status: "Замовлення в обробці" }),
            },
            {
              title: "Підтверджені",
              filter: () => setSearchParams({ status: "Замовлення підтверджено" }),
            },
            {
              title: "Для доставки",
              filter: () =>
                setSearchParams({
                  status: "Замовлення готове",
                  deliveryType: "Доставка кур'єром",
                }),
            },
            {
              title: "Для видачі",
              filter: () =>
                setSearchParams({
                  status: "Замовлення готове",
                  deliveryType: "Самовивіз",
                }),
            },
            {
              title: "В дорозі",
              filter: () => setSearchParams({ status: "Замовлення прямує до вас" }),
            },
          ]}
          initialFilter={{
            title: "Неопрацьовані",
            filter: () => setSearchParams({ status: "Замовлення в обробці" }),
            isActive: searchParams.size == 0,
          }}
        />
      )}

      {isOrdersLoading && <PageLoader />}
      {error && <ErrorMassage status={error?.status} />}

      {!isOrdersLoading && orders && (
        <>
          <ManageItem
            isLoading={isLoading}
            isError={error}
            error={<ErrorMassage status={error?.status} />}
            columns={[
              "Номер",
              "Замовник",
              "Телефон",
              "Отримання",
              "Адреса",
              "Сума",
              "Дата",
            ]}
            rowsData={orders?.[1]?.map((item) => [
              <Text key={item?.id}>№ {item?.number}</Text>,
              <Text key={item?.id} style={{ textTransform: "capitalize" }}>
                {item?.name} {item?.lastName}
              </Text>,
              <Text key={item?.id}>{item?.phone}</Text>,
              <Text key={item?.id}>{item?.deliveryType}</Text>,

              <Text key={item?.id}>
                {item?.pickupLocation || (
                  <>
                    {item?.deliveryAddress?.street}, буд. № {item?.deliveryAddress?.home}
                    ,
                    {item?.deliveryAddress?.flat
                      ? ` кв. ${item?.deliveryAddress?.flat}`
                      : ""}
                  </>
                )}
              </Text>,

              <Text key={item?.id}>{item?.totalSum} грн</Text>,
              <Text key={item?.id}>{prettyTime(item?.time)}</Text>,
            ])}
            rowOnClick={onClick}
          >
            <Pagination
              totalCount={orders?.[0]?.pages}
              siblingCount={2}
              currPage={searchParams.get("page")}
              onLink={setSearchParams}
              savedParams={(() => {
                const saved = {};
                if (searchParams.get("status"))
                  saved.status = searchParams.get("status");
                if (searchParams.get("deliveryType"))
                  saved.deliveryType = searchParams.get("deliveryType");
                return saved;
              })()}
            />
          </ManageItem>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className={styles.modal}
          >
            <OrderFullBlock
              order={orders?.[1]?.[currentOrder]}
              key={orders?.[1]?.[currentOrder]?.number}
              isPersonalData={true}
            />
            <BtnBlock>
              {orders?.[1]?.[currentOrder]?.status === "Замовлення в обробці" && (
                <Button type={"outline-red"}>Скасувати замовлення</Button>
              )}
              {orders?.[1]?.[currentOrder]?.status === "Замовлення в обробці" && (
                <Button type={"success"}>Прийняти замовлення</Button>
              )}
              {orders?.[1]?.[currentOrder]?.status === "Замовлення підтверджено" && (
                <Button type={"success"}>Передати в службу видачі</Button>
              )}
              {orders?.[1]?.[currentOrder]?.status === "Замовлення готове" &&
                orders?.[1]?.[currentOrder]?.deliveryType == "Доставка кур'єром" && (
                  <Button type={"success"}>Взяти замовлення</Button>
                )}
              {orders?.[1]?.[currentOrder]?.status === "Замовлення готове" &&
                orders?.[1]?.[currentOrder]?.deliveryType == "Самовивіз" && (
                  <Button type={"success"}>Замовлення видано</Button>
                )}
              {orders?.[1]?.[currentOrder]?.status === "Замовлення прямує до вас" && (
                <Button type={"success"}>Замовлення доставлено</Button>
              )}
            </BtnBlock>
          </Modal>
        </>
      )}
    </>
  );
};

export default OrdersManage;
