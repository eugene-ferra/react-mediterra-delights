import { useSearchParams } from "react-router-dom";
import { useDeleteReview } from "./useDeleteReview";
import { usePublishReview } from "./usePublishReview";
import Title from "../../common/Title/Title";
import ManageItem from "../ManageItem/ManageItem";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import Stars from "../../common/Stars/Stars";
import Pagination from "../../block/Pagination/Pagination";
import Button from "../../common/Button/Button";
import Text from "../../common/Text/Text";
import BtnBlock from "../BtnBlock/BtnBlock";
import { useReviews } from "../../../hooks/useReviews";

const ReviewManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { reviews, isError, error, isLoading } = useReviews(
    `page=${searchParams.get("page") || 1}&isModerated=false`
  );

  const { deleteReview, isLoading: isDeleting } = useDeleteReview();
  const { publishReview, isLoading: isPublishing } = usePublishReview();

  return (
    <>
      <Title>Нові відгуки:</Title>

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["Оцінка", "Відгук", ""]}
        rowsData={reviews?.data?.map((item, i) => [
          <Stars rating={item?.rating} key={i} />,
          <Text key={i} style={{ minWidth: "300px" }}>
            {item?.review}
          </Text>,
          <BtnBlock key={i}>
            <Button
              type={"success"}
              onClick={() => publishReview(item?.id)}
              disabled={isDeleting || isPublishing}
            >
              Опублікувати
            </Button>
            <Button
              onClick={() => deleteReview(item?.id)}
              disabled={isDeleting || isPublishing}
            >
              Видалити
            </Button>
          </BtnBlock>,
        ])}
      >
        <Pagination
          totalCount={reviews?.[0]?.pages}
          siblingCount={2}
          currPage={searchParams.get("page") || 1}
          onLink={setSearchParams}
        />
      </ManageItem>
    </>
  );
};

export default ReviewManage;
