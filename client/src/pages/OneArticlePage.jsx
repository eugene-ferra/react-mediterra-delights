import { useParams } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
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
import { useArticle } from "../hooks/useArticle";

const OneArticlePage = () => {
  const { slug } = useParams();
  const { user } = useUser();
  const { articles, isLoading, error } = useArticles(`slug=${slug}`);
  const {
    articles: more,
    isLoading: moreLoading,
    error: moreError,
  } = useArticles(`topic=${articles?.[1]?.[0]?.topic}`);
  useArticle(articles?.[1]?.[0]?.id);

  return (
    <>
      <Header />

      {isLoading && (
        <MainLayout>
          <PageLoader />
        </MainLayout>
      )}

      {error && (
        <MainLayout>
          <ErrorMassage status={error.status} />
        </MainLayout>
      )}

      {!isLoading && !error && articles && (
        <MainLayout>
          <ArticleBox
            article={articles?.[1]?.[0]}
            isLiked={user ? user.likedArticles.includes(articles?.[1]?.[0]?.id) : false}
            isSaved={user ? user.savedArticles.includes(articles?.[1]?.[0]?.id) : false}
          />
          <Gallery
            isLoading={moreLoading}
            error={moreError}
            top={<BlockHeader title={"Схожі статті"} />}
            items={more?.[1]?.map((item) => (
              <Article article={item} key={item?.id} />
            ))}
          />
        </MainLayout>
      )}

      <Footer />
    </>
  );
};

export default OneArticlePage;
