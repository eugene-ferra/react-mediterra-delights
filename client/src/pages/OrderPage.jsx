import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import OrderBox from "../components/layout/OrderBox/OrderBox";

const OrderPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <OrderBox />
      </MainLayout>
      <Footer />
    </>
  );
};

export default OrderPage;
