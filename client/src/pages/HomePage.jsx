import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MainLayout from "../components/MainLayout/MainLayout";
import Container from "../components/common/Container/Container";
import Title from "../components/common/Title/Title";

const HomePage = () => {
  return (
    <>
      <Header />
      <MainLayout>
        <Container>
          <Title type={"global"}>Сторінка в розробці</Title>
        </Container>
      </MainLayout>
      <Footer />
    </>
  );
};

export default HomePage;
