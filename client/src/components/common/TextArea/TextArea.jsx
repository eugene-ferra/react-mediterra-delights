import styles from "./TextArea.module.scss";

const TextArea = ({
  title,
  placeholder,
  name,
  errorMessage,
  register,
  disabled,
  className,
}) => {
  const errorClass = errorMessage ? styles.error : "";

  return (
    <label className={`${className || ""} `}>
      <p className={styles.inputTitle}>{title}</p>
      <textarea
        className={`${styles.input} ${errorClass}`}
        placeholder={placeholder}
        name={name}
        {...register}
        disabled={disabled}
      />
      <p className={styles.inputError}>{errorMessage}</p>
    </label>
  );
};

export default TextArea;
