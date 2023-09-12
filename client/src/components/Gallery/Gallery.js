import React from "react";
import "./Gallery.scss";

function Gallery({ children }) {
  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery__inner">{children}</div>
      </div>
    </div>
  );
}

export default Gallery;
