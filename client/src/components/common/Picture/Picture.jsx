import { useState } from "react";
import styles from "./Picture.module.scss";
import errorImg from "../../../assets/default.jpg";

const Picture = ({ formats, alt, defaultImg, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <>
      {imageLoaded ? (
        <img
          className={`${styles.img} ${className || ""}`}
          src={formats?.jpg}
          srcSet={`${formats?.avif || ""}, ${formats?.webp || ""}, ${formats?.jpg}`}
          alt={alt || "image"}
          onError={handleImageError}
          style={style}
        />
      ) : (
        <>
          {" "}
          <img
            className={`${styles.img} ${className || ""}`}
            src={defaultImg || errorImg}
            alt={alt || "image"}
            style={style}
          />
        </>
      )}
    </>
    //
  );
};

export default Picture;
