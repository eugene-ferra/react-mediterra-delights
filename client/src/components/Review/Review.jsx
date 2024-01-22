import Picture from "../common/Picture/Picture";
import styles from "./review.module.scss";
import defaultUser from "../../assets/defaultUser.svg";
import Text from "../common/Text/Text";
import Stars from "../common/Stars/Stars";

const Review = ({ review }) => {
  return (
    <div className={styles.review}>
      <div>
        <div className={styles.userData}>
          <Picture
            className={styles.avatar}
            formats={review?.userID?.avatar}
            alt={review?.userID?.name}
            defaultImg={defaultUser}
          />
          <Text>
            {review?.userID?.name} {review?.userID?.lastName}
          </Text>
        </div>
      </div>
      <Stars rating={review?.rating} />
      <Text>{review?.review}</Text>
    </div>
  );
};

export default Review;
