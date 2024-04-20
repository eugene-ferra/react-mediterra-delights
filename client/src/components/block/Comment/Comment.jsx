import Picture from "../../common/Picture/Picture";
import defaultUser from "../../../assets/defaultUser.svg";
import Text from "../../common/Text/Text";
import styles from "./Comment.module.scss";

const Comment = ({ comment }) => {
  return (
    <div className={styles.comment}>
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

      <Text>{comment?.comment}</Text>
    </div>
  );
};

export default Comment;
