import { useSearchParams } from "react-router-dom";
import { useArticles } from "../hooks/useArticles";
import { useArticleOptions } from "../hooks/useArticleOptions";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Loader from "../components/common/Loader/Loader";
import Container from "../components/layout/Container/Container";
import Title from "../components/common/Title/Title";
import Filters from "../components/layout/Filters/Filters";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import Catalog from "../components/layout/Catalog/Catalog";
import Footer from "../components/layout/Footer/Footer";
import Pagination from "../components/block/Pagination/Pagination";
import Article from "../components/block/Article/Article";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import { useEffect } from "react";

const ArticlesPage = () => {
  const { options, isLoading, error } = useArticleOptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    articles,
    isLoading: isArticleLoading,
    error: articleError,
  } = useArticles(searchParams.toString());

  useEffect(() => {
    document.title = "Статті";
  }, []);

  return (
    <>
      <Header />

      {isLoading && (
        <MainLayout>
          <PageLoader />
        </MainLayout>
      )}

      {!isLoading && (
        <MainLayout>
          <Container>
            <Title type={"global"}>Статті</Title>
            {!error && options && (
              <Filters
                filters={[
                  {
                    title: "Всі статті",
                    filter: () => setSearchParams({}),
                  },
                ].concat(
                  options?.topic?.map((item) => ({
                    title: item,
                    filter: () => setSearchParams({ topic: item }),
                  }))
                )}
                initialFilter={{
                  title: "Всі статті",
                }}
              />
            )}

            {isArticleLoading && (
              <Catalog type={"no-items"}>
                <Loader type={"global"} />
              </Catalog>
            )}

            {articleError && (
              <Catalog type={"no-items"}>
                <ErrorMassage status={articleError?.status} />
              </Catalog>
            )}

            {articles && (
              <>
                <Catalog>
                  {articles?.data?.map((article) => (
                    <Article article={article} key={article?.id} />
                  ))}
                </Catalog>
                <Pagination
                  totalCount={articles?.pages}
                  siblingCount={2}
                  currPage={searchParams.get("page") || 1}
                  onLink={setSearchParams}
                  savedParams={(() => {
                    const saved = {};
                    if (searchParams.get("topic"))
                      saved.topic = searchParams.get("topic");
                    return saved;
                  })()}
                />
              </>
            )}
          </Container>
        </MainLayout>
      )}

      <Footer />
    </>
  );
};

export default ArticlesPage;
