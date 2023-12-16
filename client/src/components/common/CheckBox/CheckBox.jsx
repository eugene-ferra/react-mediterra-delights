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
    <div>
      <p className={styles.inputTitle}>{title}</p>
      <label className={`${styles.checkBox} ${className}`}>
        <span>{text}</span>
        <input
          type="checkbox"
          className={`${styles.input} ${errorClass}`}
          name={name}
          {...register}
          disabled={disabled}
        />
        <div className={`${styles.checkBoxInput}`}></div>
      </label>
      <p className={styles.inputError}>{errorMessage}</p>
    </div>
  );
};

export default CheckBox;
