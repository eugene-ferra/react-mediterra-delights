import Picture from "../../common/Picture/Picture";
import defaultUser from "../../../assets/defaultUser.svg";
import Text from "../../common/Text/Text";
import { prettyTime } from "../../../utils/prettyTime";
import styles from "./Comment.module.scss";

const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.userData}>
        <Picture
          className={styles.avatar}
          formats={comment?.user?.avatar}
          alt={comment?.user?.name}
          defaultImg={defaultUser}
        />
        <Text style={{ textTransform: "capitalize" }}>
          {comment?.user?.name || "видалений"} {comment?.user?.lastName || "користувач"}
        </Text>

        <Text className={styles.date}>
          {prettyTime(comment?.createdAt, {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </Text>
      </div>

      <Text>{comment?.comment}</Text>
    </div>
  );
};

export default Comment;
