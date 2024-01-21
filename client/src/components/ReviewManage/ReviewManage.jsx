import { Link, useSearchParams } from "react-router-dom";
import Title from "../common/Title/Title";
import { useAdminReviews } from "./useAdminReviews";
import ManageItem from "../ManageItem/ManageItem";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Stars from "../common/Stars/Stars";
import Pagination from "../common/Pagination/Pagination";
import Button from "../common/Button/Button";
import Text from "../common/Text/Text";
import { useDeleteReview } from "./useDeleteReview";
import { usePublishReview } from "./usePublishReview";
const ReviewManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { reviews, isError, error, isLoading } = useAdminReviews(
    searchParams.get("page") || 1
  );

  const { deleteReview, isLoading: isDeleting } = useDeleteReview();
  const { publishReview, isLoading: isPublishing } = usePublishReview();

  console.log(reviews);

  return (
    <>
      <Title>Нові відгуки:</Title>

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["Оцінка", "Відгук", ""]}
        rowsData={reviews?.[1]?.map((item, i) => [
          <Stars rating={item?.rating} key={i} />,
          <Text key={i} style={{ minWidth: "300px" }}>
            {item?.review}
          </Text>,
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
            key={i}
          >
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
          </div>,
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
