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
      {title && <p className={styles.inputTitle}>{title}</p>}
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
      {errorMessage && <p className={styles.inputError}>{errorMessage}</p>}
    </div>
  );
};

export default CheckBox;
