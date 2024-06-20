import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useCart } from "../../../hooks/useCart";
import Navbar from "../../block/Navbar/Navbar";
import Button from "../../common/Button/Button";
import Container from "../Container/Container";
import Logo from "../../common/Logo/Logo";
import CartLink from "../../common/CartLink/CartLink";
import Picture from "../../common/Picture/Picture";
import registerImg from "../../../assets/register.svg";
import loginImg from "../../../assets/login.svg";
import Burger from "../../common/Burger/Burger";
import SwitchMode from "../../common/SwitchMode/SwitchMode";
import defaultAvatar from "../../../assets/defaultUser.svg";
import BtnBlock from "../BtnBlock/BtnBlock";
import styles from "./Header.module.scss";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user } = useUser();
  const { cart } = useCart();
  let { pathname, search } = useLocation();

  if (new URLSearchParams(search).get("next"))
    pathname = new URLSearchParams(search).get("next");

  const handleClick = () => {
    setIsDropDownOpen((state) => !state);
  };

  return (
    <header className={styles.header}>
      <Container className={styles.mainContent}>
        <Logo />
        <Navbar className={styles.navbar} />

        <CartLink count={user?.cart?.lenght || cart?.length} className={styles.cart} />

        {user && (
          <>
            <Link to={"/account"}>
              <Picture
                formats={user?.avatar?.jpg ? user.avatar : defaultAvatar}
                // formats={user?.avatar?.jpg}
                defaultImg={defaultAvatar}
                className={styles.avatar}
              />
            </Link>
            <SwitchMode />
          </>
        )}

        {!user && (
          <>
            <SwitchMode />
            <Button
              asTag={"Link"}
              to={`/signup?next=${pathname}`}
              className={styles.signup}
            >
              Реєстрація
              <Picture alt={"register"} formats={{ jpg: registerImg }} />
            </Button>

            <Button
              asTag={"Link"}
              to={`/login?next=${pathname}`}
              type={"outline"}
              className={styles.login}
            >
              Вхід <Picture alt={"login"} formats={{ jpg: loginImg }} />
            </Button>
          </>
        )}

        <Burger
          onClick={handleClick}
          isOpen={isDropDownOpen}
          className={styles.toggle}
        />
      </Container>

      <div className={isDropDownOpen ? styles.dropDownShow : styles.dropDown}>
        <Navbar className={styles.navbarMobile} onClick={handleClick} />
        {!user && (
          <BtnBlock>
            <Button asTag={"Link"} to={`/signup?next=${pathname}`} onClick={handleClick}>
              Реєстрація
              {<Picture alt={"register"} formats={{ jpg: registerImg }} />}
            </Button>
            <Button
              asTag={"Link"}
              to={`/login?next=${pathname}`}
              type={"outline"}
              onClick={handleClick}
            >
              Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
            </Button>
          </BtnBlock>
        )}
      </div>
    </header>
  );
};

export default Header;
