import Picture from "../common/Picture/Picture";
import styles from "./Comment.module.scss";
import defaultUser from "../../assets/defaultUser.svg";
import Text from "../common/Text/Text";

const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div>
        <div className={styles.userData}>
          <Picture
            className={styles.avatar}
            formats={comment?.userID?.avatar}
            alt={comment?.userID?.name}
            defaultImg={defaultUser}
          />
          <Text style={{ textTransform: "capitalize" }}>
            {comment?.userID?.name || "видалений"}{" "}
            {comment?.userID?.lastName || "користувач"}
          </Text>
        </div>
      </div>
      <Text>{comment?.comment}</Text>
    </div>
  );
};

export default Comment;
