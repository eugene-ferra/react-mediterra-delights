import { Link, useParams } from "react-router-dom";
import { useOrderById } from "../hooks/useOrderById";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Title from "../components/common/Title/Title";
import Picture from "../components/common/Picture/Picture";
import Text from "../components/common/Text/Text";
import Container from "../components/layout/Container/Container";
import Loader from "../components/common/Loader/Loader";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import OrderSuccess from "../components/layout/OrderSuccess/OrderSuccess";

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();

  const { order, isLoading, isError, error } = useOrderById(orderNumber);

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
