import { useState } from "react";
import { useOrder } from "../hooks/useOrder";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Container from "../components/layout/Container/Container";
import Title from "../components/common/Title/Title";
import OrderFullBlock from "../components/block/OrderFullBlock/OrderFullBlock";
import SubmitSearch from "../components/layout/SubmitSearch/SubmitSearch";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import Text from "../components/common/Text/Text";

const CheckOrderPage = () => {
  const [number, setNumber] = useState(null);
  const { isLoading, order, isError, error } = useOrder(number);

  return (
    <>
      <Header />
      <MainLayout style={{ paddingBottom: "20px" }}>
        <Container>
          <Title type={"global"}>Відстеження замовлення</Title>

          <SubmitSearch
            setValue={setNumber}
            isLoading={isLoading}
            inputTitle={"Введіть номер замовлення*"}
          >
            {order && !isLoading && <OrderFullBlock order={order} />}
            {isLoading && <PageLoader />}
            {!order && number && isError && <ErrorMassage status={error?.status} />}
            {!order && !number && (
              <Text align={"center"}>
                Для відображення інформації по замовленню введіть його номер вище!
              </Text>
            )}
          </SubmitSearch>
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default CheckOrderPage;
