import Title from "../common/Title/Title";
import { useUser } from "../../hooks/useUser";
import OrderFullBlock from "../OrderFullBlock/OrderFullBlock";

const AccountOrders = () => {
  const { user } = useUser();

  return (
    <>
      <Title>Ваші замовлення:</Title>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {user?.orders?.map((order) => (
          <OrderFullBlock id={order} key={order} isDropDown={true} />
        ))}
      </div>
    </>
  );
};

export default AccountOrders;
