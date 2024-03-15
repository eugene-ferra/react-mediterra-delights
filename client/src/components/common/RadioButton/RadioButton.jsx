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
      {title && <p className={styles.inputTitle}>{title}</p>}
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
      {errorMessage && <p className={styles.inputError}>{errorMessage}</p>}
    </div>
  );
};

export default RadioButton;
