import Picture from "../Picture/Picture";
import Text from "../Text/Text";
import styles from "./Avatar.module.scss";
import userImg from "../../../assets/defaultUser.svg";

const Avatar = ({ className, formats, name }) => {
  return (
    <div className={`${styles.avatar} ${className || ""}`}>
      <Picture alt={name} formats={{ ...(formats || { jpg: userImg }) }} />
      <Text>{name || ""}</Text>
    </div>
  );
};

export default Avatar;
