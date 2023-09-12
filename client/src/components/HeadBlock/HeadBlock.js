import "./HeadBlock.scss";

import React from "react";

function HeadBlock({ text, link, modifier }) {
  return (
    <div className={`head-block ${modifier}`}>
      <h2 className="head-block__title">{text}</h2>
      <a href={link} className="head-block__link">
        Більше інформації
      </a>
    </div>
  );
}

export default HeadBlock;
