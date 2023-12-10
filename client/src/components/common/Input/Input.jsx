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
}) => {
  return (
    <label className={className || ""}>
      <p className={styles.inputTitle}>{title}</p>
      <input
        className={`${styles.input}`}
        type={type}
        placeholder={placeholder}
        name={name}
        {...register}
        disabled={disabled}
      />
      <p className={styles.inputError}>{errorMessage}</p>
    </label>
  );
};

export default Input;
