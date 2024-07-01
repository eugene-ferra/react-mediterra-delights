import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOrderOptions } from "../OrderBox/useOrderOptions";
import { useOrders } from "../../../hooks/useOrders";
import { useProceedOrder } from "./useProceedOrder";
import { prettyTime } from "../../../utils/prettyTime";
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
import SearchInput from "../SearchInput/SearchInput";
import styles from "./OrdersManage.module.scss";

const OrdersManage = () => {
  const { options, isLoading } = useOrderOptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [searchPage, setSearchPage] = useState({ page: 1 });

  const deliveryType = searchParams.get("deliveryType");
  const status = searchParams.get("status");
  const baseEnd = `limit=5&sort=-time`;

  const {
    orders,
    isLoading: isOrdersLoading,
    error,
  } = useOrders(
    searchValue
      ? `${deliveryType ? `deliveryType=${deliveryType}&` : ""}${
          status ? `status=${status}&` : ""
        }page=${searchPage.page}&number[regex]=${searchValue}&${baseEnd}`
      : `${searchParams.toString()}&${baseEnd}`
  );

  const { proceedOrder, isProceeding } = useProceedOrder();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const onClick = (id) => {
    setCurrentOrder(id);
    setIsModalOpen(true);
  };

  const onProceed = (status, isPayed) => {
    return () => {
      proceedOrder({ id: orders?.data?.[currentOrder]?.id, data: { status, isPayed } });
      setIsModalOpen(false);
    };
  };

  return (
    <>
      {isLoading && <PageLoader />}

      {!isLoading && options && (
        <>
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
          <SearchInput
            setValue={setSearchValue}
            value={searchValue}
            inputTitle={"Пошук cтатті"}
            resetFn={() => setSearchPage({ page: 1 })}
          />
        </>
      )}

      {isOrdersLoading && <PageLoader />}
      {error?.status && <ErrorMassage status={error?.status} />}

      {!isOrdersLoading && !error?.status && orders && (
        <>
          <ManageItem
            isLoading={isLoading}
            columns={[
              "Номер",
              "Замовник",
              "Телефон",
              "Отримання",
              "Адреса",
              "Сума",
              "Дата",
            ]}
            rowsData={orders?.data?.map((item) => [
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
              totalCount={orders?.pages}
              siblingCount={2}
              currPage={searchValue ? searchPage.page : searchParams.get("page")}
              onLink={searchValue ? setSearchPage : setSearchParams}
              savedParams={(() => {
                if (!searchParams) return {};

                let saved = {};
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
            isLoading={isProceeding}
          >
            <OrderFullBlock
              order={orders?.data?.[currentOrder]}
              key={orders?.data?.[currentOrder]?.number}
              isPersonalData={true}
            />
            <BtnBlock>
              {orders?.data?.[currentOrder]?.status === "Замовлення в обробці" && (
                <Button
                  type={"outline-red"}
                  onClick={onProceed(
                    "Замовлення скасовано",
                    orders?.data?.[currentOrder]?.isPayed
                  )}
                  disabled={isProceeding}
                >
                  Скасувати замовлення
                </Button>
              )}
              {orders?.data?.[currentOrder]?.status === "Замовлення в обробці" && (
                <Button
                  type={"success"}
                  onClick={onProceed(
                    "Замовлення підтверджено",
                    orders?.data?.[currentOrder]?.isPayed
                  )}
                  disabled={isProceeding}
                >
                  Прийняти замовлення
                </Button>
              )}
              {orders?.data?.[currentOrder]?.status === "Замовлення підтверджено" && (
                <Button
                  type={"success"}
                  onClick={onProceed(
                    "Замовлення готове",
                    orders?.data?.[currentOrder]?.isPayed
                  )}
                  disabled={isProceeding}
                >
                  Передати в службу видачі
                </Button>
              )}
              {orders?.data?.[currentOrder]?.status === "Замовлення готове" &&
                orders?.data?.[currentOrder]?.deliveryType == "Доставка кур'єром" && (
                  <Button
                    type={"success"}
                    onClick={onProceed(
                      "Замовлення прямує до вас",
                      orders?.data?.[currentOrder]?.isPayed
                    )}
                    disabled={isProceeding}
                  >
                    Взяти замовлення
                  </Button>
                )}
              {orders?.data?.[currentOrder]?.status === "Замовлення готове" &&
                orders?.data?.[currentOrder]?.deliveryType == "Самовивіз" && (
                  <Button
                    type={"success"}
                    onClick={onProceed("Замовлення отримано", true)}
                    disabled={isProceeding}
                  >
                    Замовлення видано
                  </Button>
                )}
              {orders?.data?.[currentOrder]?.status === "Замовлення прямує до вас" && (
                <Button
                  type={"success"}
                  onClick={onProceed("Замовлення отримано", true)}
                  disabled={isProceeding}
                >
                  Замовлення доставлено
                </Button>
              )}
            </BtnBlock>
          </Modal>
        </>
      )}
    </>
  );
};

export default OrdersManage;
