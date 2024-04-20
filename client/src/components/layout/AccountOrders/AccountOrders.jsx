import { useUser } from "../../../hooks/useUser";
import Title from "../../common/Title/Title";
import OrderFullBlock from "../../block/OrderFullBlock/OrderFullBlock";
import styles from "./AccountOrders.module.scss";

const AccountOrders = () => {
  const { user } = useUser();

  return (
    <>
      <Title>Ваші замовлення:</Title>

      <div className={styles.inner}>
        {user?.orders?.map((order) => (
          <OrderFullBlock
            id={order}
            key={order}
            isDropDown={true}
            isPersonalData={true}
          />
        ))}
      </div>
    </>
  );
};

export default AccountOrders;
