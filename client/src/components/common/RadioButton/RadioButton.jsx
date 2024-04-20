import Text from "../Text/Text";
import Title from "../Title/Title";
import styles from "./RadioButton.module.scss";

const RadioButton = ({
  title,
  name,
  radioGroup,
  text,
  errorMessage,
  register,
  value,
  disabled,
  className,
  onCheck,
}) => {
  const errorClass = errorMessage ? styles.error : "";

  return (
    <div className={styles.inner}>
      {title && <Title type={"input"}>{title}</Title>}
      <label className={`${styles.radio} ${className || ""}`} onChange={onCheck}>
        <span className={styles.text}>{text}</span>
        <input
          type="radio"
          radioGroup={radioGroup}
          className={`${styles.input} ${errorClass || ""}`}
          name={name}
          value={value}
          {...register}
          disabled={disabled}
        />
        <div className={`${styles.radioInput}`}></div>
      </label>
      {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
    </div>
  );
};

export default RadioButton;
