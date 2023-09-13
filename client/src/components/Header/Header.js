import "./Header.scss";
import { useState } from "react";

function Header({ logo, content, sign }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          {logo}

          <div
            className={`header__content ${
              isOpen ? "header__content--active" : ""
            }`}
          >
            {content}

            <div className="header__sign">{sign}</div>
          </div>
          <div
            className={`header__burger ${
              isOpen ? "header__burger--active" : ""
            }`}
            onClick={handleClick}
          >
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
