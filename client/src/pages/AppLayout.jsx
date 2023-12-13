import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const AppLayout = () => {
  return (
    <>
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    </>
  );
};

export default AppLayout;
