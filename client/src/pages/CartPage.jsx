import CartBox from "../components/layout/CartBox/CartBox";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";

const CartPage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <CartBox />
      </MainLayout>
      <Footer />
    </>
  );
};

export default CartPage;
