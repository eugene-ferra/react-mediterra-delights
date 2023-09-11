import "./HeadBlock.scss";

import React from "react";

function HeadBlock({ link }) {
  return (
    <div className="head-block">
      <h2 className="head-block__title">Про нас</h2>
      <a href={link} className="head-block__link">
        Більше інформації
      </a>
    </div>
  );
}

export default HeadBlock;
