import { useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import OrderSuccess from "../components/layout/OrderSuccess/OrderSuccess";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();

  useEffect(() => {
    document.title = "Замовлення прийняте!";
  }, []);

  const { order, isLoading, isError, error } = useOrder(orderNumber);

  return (
    <>
      <Header />
      <MainLayout>
        {isLoading && <PageLoader />}

        {isError && <ErrorMassage status={error.status} />}

        {!isLoading && !isError && order && <OrderSuccess order={order?.[0]} />}
      </MainLayout>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
