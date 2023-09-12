import "./HeadBlock.scss";

import React from "react";

function HeadBlock({ text, link, linkText, modifier }) {
  return (
    <div className={`head-block ${modifier ? modifier : ""}`}>
      <h2 className="head-block__title">{text}</h2>
      {link && linkText ? (
        <a href={link} className="head-block__link">
          {linkText}
        </a>
      ) : null}
    </div>
  );
}

export default HeadBlock;
