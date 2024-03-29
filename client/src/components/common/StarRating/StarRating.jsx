import { useState } from "react";
import styles from "./StarRating.module.scss";
import StarFullIcon from "../../svg/StarFullIcon";
import StarOutlinedIcon from "../../svg/StarOutlinedIcon";
import { Controller, useFormContext } from "react-hook-form";

const StarRating = ({ title, name, disabled, errorMessage }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Rating
          onSetRating={onChange}
          name={name}
          title={title}
          disabled={disabled}
          errorMessage={errorMessage}
        />
      )}
      name={name}
      control={control}
    />
  );
};

const Rating = ({ onSetRating, title, disabled, errorMessage }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const maxRating = 5;
  const messages = [1, 2, 3, 4, 5];

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className={styles.inner}>
      <p className={styles.inputTitle}>{title}</p>
      <div className={styles.container}>
        <div className={styles.stars}>
          {Array.from({ length: maxRating }, (_, i) => (
            <button
              key={i}
              className={styles.button}
              onClick={(e) => {
                e.preventDefault();
                handleRating(i + 1);
              }}
              onMouseEnter={() => setTempRating(i + 1)}
              onMouseLeave={() => setTempRating(0)}
              disabled={disabled}
            >
              <Star full={tempRating ? tempRating >= i + 1 : rating >= i + 1} />
            </button>
          ))}
        </div>
        <p className={styles.text}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ""}
        </p>
      </div>
      <p className={styles.inputError}>{errorMessage}</p>
    </div>
  );
};

function Star({ full }) {
  return (
    <span role="button" className={styles.star}>
      {full ? <StarFullIcon /> : <StarOutlinedIcon />}
    </span>
  );
}

export default StarRating;
