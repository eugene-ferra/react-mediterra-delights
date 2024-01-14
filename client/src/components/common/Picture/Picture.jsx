import styles from "./Picture.module.scss";

const Picture = ({ formats, alt, className }) => {
  return (
    <img
      className={`${styles.img} ${className || ""}`}
      src={
        formats?.jpg ||
        "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4="
      }
      srcSet={`${formats?.avif || ""}, ${formats?.webp || ""}, ${formats?.jpg}`}
      alt={alt || "image"}
    />
  );
};

export default Picture;
