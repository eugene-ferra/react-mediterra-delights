import Picture from "../Picture/Picture";
import Text from "../Text/Text";
import styles from "./Avatar.module.scss";
import userImg from "../../../assets/defaultUser.svg";

const Avatar = ({ className, formats, name }) => {
  const isAvatarExists = Object.values(formats).every((item) => item != null);

  return (
    <div className={`${styles.avatar} ${className || ""}`}>
      <Picture alt={name} formats={isAvatarExists ? formats : { jpg: userImg }} />
      <Text>{name || ""}</Text>
    </div>
  );
};

export default Avatar;
