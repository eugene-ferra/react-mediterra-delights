import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUser } from "../../../hooks/useUser";
import { usePostComment } from "./usePostComment";
import { useLikeArticle } from "./useLikeArticle";
import { useSaveArticle } from "./useSaveArticle";
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
import styles from "./ArticleBox.module.scss";
import BtnBlock from "../BtnBlock/BtnBlock";

const ArticleBox = ({ article, isLiked, isSaved }) => {
  const methods = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const { postComment, isLoading, errors } = usePostComment(() => {
    methods.reset();
    setIsModalOpen(false);
  });

  const { likeArticle, unlikeArticle, isUnliking, isLiking } = useLikeArticle(
    article?.id
  );

  const { saveArticle, deleteArticle, isDeleting, isSaving } = useSaveArticle(
    article?.id
  );

  const { user } = useUser();

  async function onSubmit(data) {
    data["articleID"] = article?.id;
    data["userID"] = user?.id;
    postComment(data);
  }

  return (
    <>
      <Container>
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
              <button className={styles.stat} onClick={() => setIsSavedModalOpen(true)}>
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
              <button className={styles.stat} onClick={() => setIsLikeModalOpen(true)}>
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
            {article?.comments.length > 0 ? (
              <>
                {article?.comments.map((comment) => (
                  <Comment comment={comment} key={comment.id} />
                ))}
              </>
            ) : (
              <Text align={"center"}>
                Коментарів ще немає. Будьте першим, хто залише коментар до цієї статті!
              </Text>
            )}
            <Button onClick={() => setIsModalOpen(true)}>Залишити коментар</Button>
          </div>
        </div>
      </Container>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          <div>
            <Title align={"center"} type={"small"}>
              Залишати коментарі можуть лише користувачі сайту!
            </Title>
            <div className={styles.modalBody}>
              <Button asTag={"Link"} to={"/login"}>
                Увійти
              </Button>
              <Button type={"outline-red"} asTag={"Link"} to={"/signup"}>
                Зареєструватися
              </Button>
            </div>
          </div>
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
          <Button asTag={"Link"} to={"/login"}>
            Увійти
          </Button>
          <Button type={"outline-red"} asTag={"Link"} to={"/signup"}>
            Зареєструватися
          </Button>
        </BtnBlock>
      </Modal>

      <Modal isOpen={isSavedModalOpen} onClose={() => setIsSavedModalOpen(false)}>
        <Title align={"center"} type={"small"}>
          Зберігати статті можуть лише користувачі сайту!
        </Title>
        <BtnBlock>
          <Button asTag={"Link"} to={"/login"}>
            Увійти
          </Button>
          <Button type={"outline-red"} asTag={"Link"} to={"/signup"}>
            Зареєструватися
          </Button>
        </BtnBlock>
      </Modal>
    </>
  );
};

export default ArticleBox;
