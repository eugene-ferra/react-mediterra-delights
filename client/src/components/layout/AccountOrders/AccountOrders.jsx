import { useSearchParams } from "react-router-dom";
import { useOrderHistory } from "./useOrderHistory";
import { useUser } from "../../../hooks/useUser";
import Title from "../../common/Title/Title";
import OrderFullBlock from "../../block/OrderFullBlock/OrderFullBlock";
import Pagination from "../../block/Pagination/Pagination";
import PageLoader from "../PageLoader/PageLoader";
import styles from "./AccountOrders.module.scss";
import Button from "../../common/Button/Button";

const AccountOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const { orders, isOrdersLoading } = useOrderHistory(
    user,
    searchParams.get("page") || 1
  );

  return (
    <>
      <Title>Ваші замовлення:</Title>

      {orders?.data && !isOrdersLoading && (
        <div className={styles.inner}>
          {isOrdersLoading && <PageLoader />}

          <>
            <div className={styles.orders}>
              {orders.data?.map((order) => (
                <OrderFullBlock
                  order={order}
                  key={order?.id}
                  isDropDown={true}
                  isPersonalData={true}
                />
              ))}
            </div>
            <Pagination
              totalCount={orders?.pages}
              siblingCount={2}
              currPage={searchParams.get("page") || 1}
              onLink={setSearchParams}
            />
          </>
        </div>
      )}
      {!isOrdersLoading && !orders?.data && (
        <>
          <Title type="small">Ви ще не зробили жодного замовлення</Title>
          <Button asTag="Link" to="/cart">
            Перейти до кошика
          </Button>
        </>
      )}
    </>
  );
};

export default AccountOrders;
