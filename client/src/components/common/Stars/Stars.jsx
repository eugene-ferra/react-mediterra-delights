import StarFullIcon from "../../svg/StarFullIcon";
import styles from "./Stars.module.scss";

const lastDigit = (number) => {
  return number?.toString().slice(-1);
};

const Stars = ({ rating, reviews }) => {
  const percent = Math.round((rating / 5) * 100);

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        <div className={styles.starsDisabled}>
          <div className={styles.imgs}>
            <StarFullIcon />
            <StarFullIcon />
            <StarFullIcon />
            <StarFullIcon />
            <StarFullIcon />
          </div>
        </div>
        {percent > 0 ? (
          <div className={styles.starActive} style={{ width: `${percent}%` }}>
            <div className={styles.imgs}>
              <StarFullIcon />
              <StarFullIcon />
              <StarFullIcon />
              <StarFullIcon />
              <StarFullIcon />
            </div>
          </div>
        ) : null}
      </div>
      {reviews >= 0 && (
        <p className={styles.reviews}>
          {reviews} відгук
          {(lastDigit(reviews) == 0 || lastDigit(reviews) >= 5) && "ів"}
          {lastDigit(reviews) < 5 && lastDigit(reviews) > 1 && "и"}
        </p>
      )}
    </div>
  );
};

export default Stars;
