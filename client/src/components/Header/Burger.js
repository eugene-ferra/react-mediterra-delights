import React from "react";

function Burger({ isOpen, handleClick }) {
  return (
    <div
      className={`header__burger ${isOpen ? "header__burger--active" : ""}`}
      onClick={handleClick}
    >
      <span className="header__burger-line"></span>
      <span className="header__burger-line"></span>
      <span className="header__burger-line"></span>
    </div>
  );
}

export default Burger;
