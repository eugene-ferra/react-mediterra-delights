import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Picture from "../components/common/Picture/Picture";
import Title from "../components/common/Title/Title";
import notFoundPic from "../assets/notFound.png";
import Button from "../components/common/Button/Button";

const NotFoundPage = () => {
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
        <Title>Схоже, такої сторінки не існує!</Title>
        <Button asTag={"Link"} to={"/"} type={"back"}>
          На головну
        </Button>
        <Picture
          formats={{ jpg: notFoundPic }}
          alt={"404"}
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "400px",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </MainLayout>
      <Footer />
    </>
  );
};

export default NotFoundPage;
