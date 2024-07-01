import Picture from "../../common/Picture/Picture";
import defaultUser from "../../../assets/defaultUser.svg";
import Text from "../../common/Text/Text";
import Stars from "../../common/Stars/Stars";
import styles from "./review.module.scss";

const Review = ({ review }) => {
  return (
    <div className={styles.review}>
      <div className={styles.userData}>
        <Picture
          className={styles.avatar}
          formats={review?.user?.avatar}
          alt={review?.user?.name}
          defaultImg={defaultUser}
        />
        <Text style={{ textTransform: "capitalize" }}>
          {review?.user?.name || "Видалений"} {review?.user?.lastName || "Користувач"}
        </Text>
      </div>

      <Stars rating={review?.rating} />
      <Text>{review?.review}</Text>
    </div>
  );
};

export default Review;
