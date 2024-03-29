import { useSearchParams } from "react-router-dom";
import Title from "../common/Title/Title";
import ManageItem from "../ManageItem/ManageItem";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";
import Text from "../common/Text/Text";
import Button from "../common/Button/Button";
import { useAdminComments } from "./useAdminComments";
import { useDeleteComment } from "./useDeleteComments";
import { usePublishComment } from "./usePublishComment";
import Pagination from "../common/Pagination/Pagination";

const CommentManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { comments, isError, error, isLoading } = useAdminComments(
    searchParams.get("page") || 1
  );

  const { deleteComment, isLoading: isDeleting } = useDeleteComment();
  const { publishComment, isLoading: isPublishing } = usePublishComment();

  return (
    <>
      <Title>Нові коментарі:</Title>

      <ManageItem
        isLoading={isLoading}
        isError={isError}
        error={<ErrorMassage status={error?.status} />}
        columns={["Відгук", ""]}
        rowsData={comments?.[1]?.map((item, i) => [
          <Text key={i} style={{ minWidth: "300px" }}>
            {item?.comment}
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
              onClick={() => publishComment(item?.id)}
              disabled={isDeleting || isPublishing}
            >
              Опублікувати
            </Button>
            <Button
              onClick={() => deleteComment(item?.id)}
              disabled={isDeleting || isPublishing}
            >
              Видалити
            </Button>
          </div>,
        ])}
      >
        <Pagination
          totalCount={comments?.[0]?.pages}
          siblingCount={2}
          currPage={searchParams.get("page") || 1}
          onLink={setSearchParams}
        />
      </ManageItem>
    </>
  );
};

export default CommentManage;
