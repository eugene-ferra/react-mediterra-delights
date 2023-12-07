import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";

const AppLayout = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer />
    </>
  );
};

export default AppLayout;
