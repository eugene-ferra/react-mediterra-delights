import { useSearchParams } from "react-router-dom";
import { useDeleteComment } from "./useDeleteComments";
import { usePublishComment } from "./usePublishComment";
import Title from "../../common/Title/Title";
import ManageItem from "../ManageItem/ManageItem";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import Text from "../../common/Text/Text";
import Button from "../../common/Button/Button";
import Pagination from "../../block/Pagination/Pagination";
import BtnBlock from "../BtnBlock/BtnBlock";
import { useComments } from "../../../hooks/useComments";

const CommentManage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { comments, isError, error, isLoading } = useComments(
    `page=${searchParams.get("page") || 1}&isModerated=false`
  );

  const { deleteComment, isLoading: isDeleting } = useDeleteComment();
  const { publishComment, isLoading: isPublishing } = usePublishComment();

  return (
    <>
      <Title>Нові коментарі:</Title>

      {error?.status == 404 && !comments?.data && (
        <Text>Нових коментарів поки що немає!</Text>
      )}

      {comments?.data && !error && (
        <ManageItem
          isLoading={isLoading}
          isError={isError}
          error={<ErrorMassage status={error?.status} />}
          columns={["Відгук", ""]}
          rowsData={comments?.data?.map((item, i) => [
            <Text key={i} style={{ minWidth: "300px" }}>
              {item?.comment}
            </Text>,
            <BtnBlock key={i}>
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
            </BtnBlock>,
          ])}
        >
          <Pagination
            totalCount={comments?.pages}
            siblingCount={2}
            currPage={searchParams.get("page") || 1}
            onLink={setSearchParams}
          />
        </ManageItem>
      )}
    </>
  );
};

export default CommentManage;
