import { Link } from "react-router-dom";
import { prettyTime } from "../../../utils/prettyTime";
import Picture from "../../common/Picture/Picture";
import Title from "../../common/Title/Title";
import LikesIcon from "../../svg/LikesIcon";
import ViewsIcon from "../../svg/ViewsIcon";
import Text from "../../common/Text/Text";
import styles from "./Article.module.scss";

const Article = ({ article }) => {
  return (
    <Link className={styles.article} to={`/articles/${article?.slug}`}>
      <Picture formats={article?.imgCover} className={styles.img} alt={article?.title} />
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
        </div>
        <Text type={"small"}>{article?.previewText}</Text>
      </div>

      <p className={styles.info}>{prettyTime(article?.createdAt)}</p>
    </Link>
  );
};

export default Article;
