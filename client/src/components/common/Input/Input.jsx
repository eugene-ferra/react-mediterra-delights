import eye from "../../../assets/eye.svg";
import eyeClose from "../../../assets/eye-close.svg";
import Title from "../Title/Title";
import Text from "../Text/Text";
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
  isShow,
  onShow,
  onChange,
  icon,
  value,
}) => {
  const errorClass = errorMessage ? styles.error : "";

  return (
    <label className={` ${className || ""} `}>
      {title && <Title type={"input"}>{title}</Title>}

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

        {type !== "password" && icon && <div className={styles.icon}>{icon}</div>}

        <input
          className={`${styles.input} ${errorClass}`}
          type={onShow ? (isShow ? "text" : "password") : type}
          placeholder={placeholder}
          name={name}
          {...register}
          onChange={onChange}
          disabled={disabled}
          style={style}
          value={value}
        ></input>
      </div>
      {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
    </label>
  );
};

export default Input;
