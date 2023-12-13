import styles from "./Picture.module.scss";

const Picture = ({ formats, alt, className }) => {
  return (
    <img
      className={`${styles.img} ${className || ""}`}
      src={formats?.jpg}
      srcSet={`${formats?.avif || ""} ${formats?.webp || ""} ${formats?.jpg}`}
      alt={alt || "image"}
    />
  );
};

export default Picture;
