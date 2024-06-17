import { useWorkers } from "../hooks/useWorkers";
import { useWorkersOptions } from "../hooks/useWorkersOptions";
import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import Container from "../components/layout/Container/Container";
import Title from "../components/common/Title/Title";
import WorkerCard from "../components/block/WorkerCard/WorkerCard";
import Catalog from "../components/layout/Catalog/Catalog";
import PageLoader from "../components/layout/PageLoader/PageLoader";
import ErrorMassage from "../components/common/ErrorMassage/ErrorMassage";
import { useEffect } from "react";

const WorkersPage = () => {
  useEffect(() => {
    document.title = "Працівники";
  }, []);

  const { options } = useWorkersOptions();
  const { isError, error, isLoading, workers } = useWorkers("limit=Infinity");

  return (
    <>
      <Header />

      <MainLayout>
        {isLoading && <PageLoader />}

        {isError && (
          <Container>
            <Catalog type={"no-items"}>
              <ErrorMassage status={error?.status} />
            </Catalog>
          </Container>
        )}

        {!isLoading && workers && (
          <Container>
            {options?.positionTypes.map((posType) => (
              <>
                {workers?.[1]?.filter((worker) => worker.positionType == posType)
                  .length > 0 && (
                  <Catalog key={posType} type={"full"}>
                    <Title key={posType}>{posType}</Title>
                    {workers?.[1]
                      ?.filter((worker) => worker.positionType == posType)
                      .map((worker) => (
                        <WorkerCard worker={worker} key={worker.id} />
                      ))}
                  </Catalog>
                )}
              </>
            ))}
          </Container>
        )}
      </MainLayout>
      <Footer />
    </>
  );
};

export default WorkersPage;
