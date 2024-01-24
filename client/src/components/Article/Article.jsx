import { Link } from "react-router-dom";
import styles from "./Article.module.scss";
import Picture from "../common/Picture/Picture";
import Title from "../common/Title/Title";
import LikesIcon from "../svg/LikesIcon";
import ViewsIcon from "../svg/ViewsIcon";
import CommentsIcon from "../svg/CommentsIcon";
import Text from "../common/Text/Text";

const Article = ({ article }) => {
  return (
    <Link className={styles.article} to={`/articles/${article?.slug}`}>
      <div>
        <Picture
          formats={article?.imgCover}
          className={styles.img}
          alt={article?.title}
        />
        <Title type={"small"}>{article?.title}</Title>
        <div className={styles.body}>
          <div className={styles.infos}>
            <p className={styles.info}>
              <LikesIcon />
              {article?.likes}
            </p>

            <p className={styles.info}>
              <ViewsIcon />
              {article?.views}
            </p>
            <p className={styles.info}>
              <CommentsIcon />
              {article?.comments.length}
            </p>
          </div>
          <Text type={"small"}>{article?.previewText}</Text>
        </div>
      </div>
      <p className={styles.info}>{new Date(article?.createdAt).toLocaleString()}</p>
    </Link>
  );
};

export default Article;
