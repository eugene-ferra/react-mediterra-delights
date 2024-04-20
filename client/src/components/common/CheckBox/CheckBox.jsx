import Title from "../Title/Title";
import Text from "../Text/Text";
import styles from "./CheckBox.module.scss";

const CheckBox = ({
  title,
  name,
  text,
  errorMessage,
  register,
  disabled,
  className,
}) => {
  const errorClass = errorMessage ? styles.error : "";

  return (
    <div className={styles.inner}>
      {title && <Title type={"input"}>{errorMessage}</Title>}
      <label className={`${styles.checkBox} ${className || ""}`}>
        <span className={styles.text}>{text}</span>
        <input
          type="checkbox"
          className={`${styles.input} ${errorClass || ""}`}
          name={name}
          {...register}
          disabled={disabled}
        />
        <div className={`${styles.checkBoxInput}`}></div>
      </label>
      {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
    </div>
  );
};

export default CheckBox;
