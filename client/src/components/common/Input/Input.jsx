import styles from "./Input.module.scss";
import eye from "../../../assets/eye.svg";
import eyeClose from "../../../assets/eye-close.svg";

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
  isShow,
  onShow,
}) => {
  const errorClass = errorMessage ? styles.error : "";

  return (
    <label className={` ${className || ""} `}>
      <p className={styles.inputTitle}>{title}</p>

      <div className={styles.wrapper}>
        {type === "password" && onShow && (
          <button
            className={styles.show}
            onClick={(e) => {
              e.preventDefault();
              onShow();
            }}
            role="none"
          >
            {!isShow ? <img src={eyeClose} alt="hide" /> : <img src={eye} alt="show" />}
          </button>
        )}
        <input
          className={`${styles.input} ${errorClass}`}
          type={onShow ? (isShow ? "text" : "password") : type}
          placeholder={placeholder}
          name={name}
          {...register}
          disabled={disabled}
          style={style}
        ></input>
      </div>
      <p className={styles.inputError}>{errorMessage}</p>
    </label>
  );
};

export default Input;
