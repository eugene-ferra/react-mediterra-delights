import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import { useArticles } from "../hooks/useArticles";
import Loader from "../components/common/Loader/Loader";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import ArticleBox from "../components/ArticleBox/ArticleBox";
import { useUser } from "../hooks/useUser";
import { useArticleById } from "../hooks/useArticleById";

const OneArticlePage = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const { articles, isLoading, error } = useArticles(`slug=${slug}`);
  useArticleById(articles?.[1]?.[0]?.id);

  return (
    <>
      <Header />
      {isLoading ? (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Loader type={"global"} />
        </MainLayout>
      ) : error ? (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ErrorMassage status={error.status} />
        </MainLayout>
      ) : (
        <MainLayout>
          <ArticleBox
            article={articles?.[1]?.[0]}
            isLiked={user ? user.likedArticles.includes(articles?.[1]?.[0]?.id) : false}
            isSaved={user ? user.savedArticles.includes(articles?.[1]?.[0]?.id) : false}
          />
        </MainLayout>
      )}
      <Footer />
    </>
  );
};

export default OneArticlePage;
