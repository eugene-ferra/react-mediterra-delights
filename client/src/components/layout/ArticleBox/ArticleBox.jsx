import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "../../../hooks/useUser";
import { usePostComment } from "./usePostComment";
import { useArticle } from "../../../hooks/useArticle";
import { useLikeArticle } from "./useLikeArticle";
import { useSaveArticle } from "./useSaveArticle";
import { useArticles } from "../../../hooks/useArticles";
import { useComments } from "../../../hooks/useComments";
import Container from "../Container/Container";
import Title from "../../common/Title/Title";
import Button from "../../common/Button/Button";
import Text from "../../common/Text/Text";
import Modal from "../../block/Modal/Modal";
import Form from "../Form/Form";
import TextArea from "../../common/TextArea/TextArea";
import LikesIcon from "../../svg/LikesIcon";
import BookMarkIcon from "../../svg/BookMarkIcon";
import ViewsIcon from "../../svg/ViewsIcon";
import CommentsIcon from "../../svg/CommentsIcon";
import Comment from "../../block/Comment/Comment";
import BtnBlock from "../BtnBlock/BtnBlock";
import BlockHeader from "../BlockHeader/BlockHeader";
import Gallery from "../Gallery/Gallery";
import Article from "../../block/Article/Article";
import PageLoader from "../PageLoader/PageLoader";
import Pagination from "../../block/Pagination/Pagination";
import styles from "./ArticleBox.module.scss";

const ArticleBox = ({ slug }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState({ page: 1 });
  const { user } = useUser();
  const { article, isLoading: isArticleLoading, error } = useArticle(slug);

  if (error && error?.status) navigate(`/${error?.status}`);

  const {
    articles: more,
    isLoading: moreLoading,
    error: moreError,
  } = useArticles(article && `topic=${article?.topic}`);

  const isLiked = user ? user.likedArticles.includes(article?.id) : false;
  const isSaved = user ? user.savedArticles.includes(article?.id) : false;

  const { comments, isLoading: isCommentsLoading } = useComments(
    article && `isModerated=true&articleID=${article?.id}&page=${page?.page}&limit=5`
  );

  useEffect(() => {
    if (article) document.title = article?.title;
  }, [article]);

  const methods = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { postComment, isLoading, errors } = usePostComment(() => {
    methods.reset();
    setIsModalOpen(false);
  });

  const { pathname } = useLocation();

  const { likeArticle, unlikeArticle, isUnliking, isLiking } = useLikeArticle(
    article?.id
  );

  const { saveArticle, deleteArticle, isDeleting, isSaving } = useSaveArticle(
    article?.id
  );

  async function onSubmit(data) {
    data["articleID"] = article?.id;
    data["userID"] = user?.id;
    postComment(data);
  }

  return (
    <>
      <Container className={styles.container}>
        {isArticleLoading && <PageLoader />}

        {!isArticleLoading && article && (
          <>
            <Title type={"global"} align={"center"}>
              {article?.title}
            </Title>
            <div
              className={`${styles.content} ql-editor`}
              dangerouslySetInnerHTML={{ __html: article?.markup }}
            ></div>

            <div className={styles.coments}>
              <div className={styles.stats}>
                {user ? (
                  <button
                    className={isDeleting || isSaving ? styles.statLoading : styles.stat}
                    onClick={isSaved ? deleteArticle : saveArticle}
                    disabled={isSaving || isDeleting}
                  >
                    <BookMarkIcon full={isSaved} />
                  </button>
                ) : (
                  <button
                    className={styles.stat}
                    onClick={() => setIsSavedModalOpen(true)}
                  >
                    <BookMarkIcon full={isLiked} />
                  </button>
                )}
                {user ? (
                  <button
                    className={isUnliking || isLiking ? styles.statLoading : styles.stat}
                    onClick={isLiked ? unlikeArticle : likeArticle}
                    disabled={isUnliking || isLiking}
                  >
                    <LikesIcon full={isLiked} />
                    <Text>{article?.likes}</Text>
                  </button>
                ) : (
                  <button
                    className={styles.stat}
                    onClick={() => setIsLikeModalOpen(true)}
                  >
                    <LikesIcon full={isLiked} />
                    <Text>{article?.likes}</Text>
                  </button>
                )}

                <div className={styles.stat}>
                  <ViewsIcon /> <Text>{article?.views}</Text>
                </div>
                <div className={styles.stat}>
                  <CommentsIcon /> <Text>{article?.comments?.length}</Text>
                </div>
              </div>
              <div className={styles.commentsContent}>
                <Button onClick={() => setIsModalOpen(true)}>Залишити коментар</Button>

                {isCommentsLoading && <PageLoader />}

                {!isCommentsLoading && comments?.length > 0 && (
                  <>
                    {comments?.[1]?.map((comment) => (
                      <Comment comment={comment} key={comment.id} />
                    ))}

                    <Pagination
                      totalCount={comments?.[0]?.pages}
                      currPage={page.page}
                      onLink={setPage}
                    />
                  </>
                )}
                {!isCommentsLoading && !comments && (
                  <Text align={"center"}>
                    Коментарів ще немає. Будьте першим, хто залише коментар до цієї
                    статті!
                  </Text>
                )}
              </div>
            </div>

            <Gallery
              isLoading={moreLoading}
              error={moreError}
              top={<BlockHeader title={"Схожі статті"} />}
              items={more?.[1]?.map((item) => (
                <Article article={item} key={item?.id} />
              ))}
            />
          </>
        )}
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} align="center">
        {user ? (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Title align={"center"} type={"small"}>
                Є що додати? Залиште коментар до цієї статті!
              </Title>
              <TextArea
                type={"text"}
                title={"Коментар*"}
                register={methods.register("comment")}
                disabled={isLoading}
                errorMessage={errors?.comment}
              />
              <Button className={styles.addComment}>Додати коментар</Button>
            </Form>
          </FormProvider>
        ) : (
          <>
            <Title align={"center"} type={"small"}>
              Залишати коментарі можуть лише користувачі сайту!
            </Title>
            <BtnBlock>
              <Button asTag={"Link"} to={`/login?next=${pathname}`}>
                Увійти
              </Button>
              <Button
                type={"outline-red"}
                asTag={"Link"}
                to={`/signup?next=${pathname}`}
              >
                Зареєструватися
              </Button>
            </BtnBlock>
          </>
        )}
      </Modal>

      <Modal
        isOpen={isLikeModalOpen}
        onClose={() => setIsLikeModalOpen(false)}
        align="center"
      >
        <Title align={"center"} type={"small"}>
          Ставити лайки можуть лише користувачі сайту!
        </Title>
        <BtnBlock>
          <Button asTag={"Link"} to={`/login?next=${pathname}`}>
            Увійти
          </Button>
          <Button type={"outline-red"} asTag={"Link"} to={`/signup?next=${pathname}`}>
            Зареєструватися
          </Button>
        </BtnBlock>
      </Modal>

      <Modal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        align="center"
      >
        <Title align={"center"} type={"small"}>
          Зберігати статті можуть лише користувачі сайту!
        </Title>
        <BtnBlock>
          <Button asTag={"Link"} to={`/login?next=${pathname}`}>
            Увійти
          </Button>
          <Button type={"outline-red"} asTag={"Link"} to={`/signup?next=${pathname}`}>
            Зареєструватися
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default ArticleBox;
