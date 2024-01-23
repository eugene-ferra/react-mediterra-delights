import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Title from "../components/common/Title/Title";
import Button from "../components/common/Button/Button";

const ForbiddenPage = () => {
  return (
    <>
      <Header />
      <MainLayout
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "50px 10px",
          gap: "30px",
        }}
      >
        <Title>Схоже, ви не маєте доступу до цієї сторінки!</Title>
        <Button asTag={"Link"} to={"/"} type={"back"}>
          На головну
        </Button>
      </MainLayout>
      <Footer />
    </>
  );
};

export default ForbiddenPage;
