import { useParams } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import ArticleBox from "../components/layout/ArticleBox/ArticleBox";

const OneArticlePage = () => {
  const { slug } = useParams();

  return (
    <>
      <Header />

      <MainLayout>
        <ArticleBox slug={slug} />
      </MainLayout>

      <Footer />
    </>
  );
};

export default OneArticlePage;
