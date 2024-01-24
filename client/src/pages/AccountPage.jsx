import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import { useUser } from "../hooks/useUser";
import Loader from "../components/common/Loader/Loader";
import Panel from "../components/Panel/Panel";
import HomeIcon from "../components/svg/HomeIcon";
import CommenIcon from "../components/svg/CommenIcon";
import ReviewIcon from "../components/svg/ReviewIcon";
import OrderIcon from "../components/svg/OrderIcon";
import SaveArticleIcon from "../components/svg/SaveArticleIcon";
import FavouriteIcon from "../components/svg/FavouriteIcon";

const AccountPage = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  if (!user) navigate("/forbidden");

  return (
    <>
      {isLoading && (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Loader type={"global"} />
        </MainLayout>
      )}
      {user && (
        <>
          <Header />

          <MainLayout
            style={{ display: "flex", overflowX: "hidden", position: "relative" }}
          >
            <Panel
              links={[
                { to: "", text: "Профіль", image: <HomeIcon />, end: true },
                {
                  to: "favourite",
                  text: "Улюблене",
                  image: <FavouriteIcon />,
                },
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
