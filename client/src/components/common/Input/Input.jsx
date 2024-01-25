import styles from "./Input.module.scss";

const Input = ({
  type,
  title,
  placeholder,
  name,
  errorMessage,
  register,
  disabled,
  className,
  style,
}) => {
  const errorClass = errorMessage ? styles.error : "";

  return (
    <label className={`${className || ""} `}>
      <p className={styles.inputTitle}>{title}</p>
      <input
        className={`${styles.input} ${errorClass}`}
        type={type}
        placeholder={placeholder}
        name={name}
        {...register}
        disabled={disabled}
        style={style}
      />
      <p className={styles.inputError}>{errorMessage}</p>
    </label>
  );
};

export default Input;
