import Text from "../Text/Text";
import Title from "../Title/Title";
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
      {title && <Title type={"input"}>{title}</Title>}
      <textarea
        className={`${styles.input} ${errorClass}`}
        placeholder={placeholder}
        name={name}
        {...register}
        disabled={disabled}
      />
      {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
    </label>
  );
};

export default TextArea;
