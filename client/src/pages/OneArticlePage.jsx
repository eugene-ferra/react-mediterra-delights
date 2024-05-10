import { useParams } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import { useArticle } from "../hooks/useArticle";
import { useUser } from "../hooks/useUser";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import ArticleBox from "../components/layout/ArticleBox/ArticleBox";
import Gallery from "../components/layout/Gallery/Gallery";
import BlockHeader from "../components/layout/BlockHeader/BlockHeader";
import Article from "../components/block/Article/Article";
import PageLoader from "../components/layout/PageLoader/PageLoader";

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
