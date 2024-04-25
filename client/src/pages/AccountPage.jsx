import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Panel from "../components/layout/Panel/Panel";
import HomeIcon from "../components/svg/HomeIcon";
import OrderIcon from "../components/svg/OrderIcon";
import SaveArticleIcon from "../components/svg/SaveArticleIcon";
import FavIcon from "../components/svg/FavouriteIcon";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import { useEffect } from "react";

const AccountPage = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/forbidden");
  }, [user, navigate, isLoading]);

  return (
    <>
      {isLoading && (
        <MainLayout>
          <PageLoader />
        </MainLayout>
      )}
      {user && (
        <>
          <Header />

          <MainLayout>
            <Panel
              links={[
                { to: "", text: "Профіль", image: <HomeIcon />, end: true },
                { to: "favourite", text: "Улюблене", image: <FavIcon /> },
                { to: "saved", text: "Збережене", image: <SaveArticleIcon /> },
                { to: "orders", text: "Замовлення", image: <OrderIcon /> },
              ]}
            >
              <Outlet />
            </Panel>
          </MainLayout>
        </>
      )}
    </>
  );
};

export default AccountPage;
