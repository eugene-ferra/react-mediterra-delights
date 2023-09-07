import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import signUp from "../../images/sign_up.svg";
import login from "../../images/login.svg";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="header">
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <Logo className="header__logo" />
            <div
              className={`header__content ${
                isOpen ? "header__content--active" : ""
              }`}
            >
              <Navbar className="header__navbar" />
              <div className="header__sign">
                <Button
                  text={"Реєстрація"}
                  classes={"button--mini button--outline"}
                  icon={signUp}
                />

                <Button
                  text={"Вхід"}
                  classes={"button button--mini"}
                  icon={login}
                />
              </div>
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
    </div>
  );
}

export default Header;
