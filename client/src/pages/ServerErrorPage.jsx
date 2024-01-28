import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Picture from "../components/common/Picture/Picture";
import Title from "../components/common/Title/Title";
import serverErrorPic from "../assets/serverError.png";

const ServerErrorPage = () => {
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
        <Title align={"center"}>
          Сталася помилка... Ми вже працюємо над її вирішенням
        </Title>
        <Picture
          formats={{ jpg: serverErrorPic }}
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

export default ServerErrorPage;
