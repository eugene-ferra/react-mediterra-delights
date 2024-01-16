import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import MainLayout from "../components/MainLayout/MainLayout";
import Loader from "../components/common/Loader/Loader";
import Container from "../components/common/Container/Container";
import Title from "../components/common/Title/Title";
import Filters from "../components/common/Filters/Filters";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import Catalog from "../components/Catalog/Catalog";
import Footer from "../components/Footer/Footer";
import Pagination from "../components/common/Pagination/Pagination";
import { useArticleOptions } from "../hooks/useArticleOptions";
import { useArticles } from "../hooks/useArticles";
import Article from "../components/Article/Article";

const ArticlesPage = () => {
  const { options, isLoading, error } = useArticleOptions();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    articles,
    isLoading: isArticleLoading,
    error: articleError,
  } = useArticles(searchParams.toString());

  console.log(articles);

  return (
    <>
      <Header />
      {isLoading ? (
        <MainLayout
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Loader type={"global"} />
        </MainLayout>
      ) : (
        <MainLayout>
          <Container>
            <Title type={"global"}>Статті</Title>
            {!error && (
              <Filters
                resetFilter={"Всі статті"}
                filters={options?.topic}
                currentFilter={searchParams?.get("topic")}
                onFilter={setSearchParams}
                filterQuery={"topic"}
              />
            )}
            {isArticleLoading ? (
              <div style={{ marginTop: "40px" }}>
                <Loader type={"global"} />
              </div>
            ) : articleError ? (
              <div style={{ marginTop: "40px" }}>
                <ErrorMassage status={articleError?.status} />
              </div>
            ) : (
              <>
                <Catalog>
                  {articles?.[1].map((article) => (
                    <Article article={article} key={article?.id} />
                  ))}
                </Catalog>
                <Pagination
                  totalCount={articles?.[0].pages}
                  siblingCount={2}
                  currPage={searchParams.get("page") || 1}
                  onLink={setSearchParams}
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
