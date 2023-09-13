import React from "react";
import Navbar from "../Navbar/Navbar";

function HeaderContent({ children, isOpen }) {
  return (
    <div
      className={`header__content ${isOpen ? "header__content--active" : ""}`}
    >
      {children}
    </div>
  );
}

export default HeaderContent;
