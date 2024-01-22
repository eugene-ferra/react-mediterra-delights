import styles from "./Header.module.scss";
import Navbar from "../common/Navbar/Navbar";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";
import Container from "../common/Container/Container";
import Logo from "../common/Logo/Logo";
import CartLink from "../common/CartLink/CartLink";
import Picture from "../common/Picture/Picture";
import registerImg from "../../assets/register.svg";
import loginImg from "../../assets/login.svg";
import Avatar from "../common/Avatar/Avatar";
import Burger from "../common/Burger/Burger";
import { useContext, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useCart } from "../../hooks/useCart";
import { CartContext } from "../../App";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user } = useUser();
  const { cart } = useCart();

  const handleClick = () => {
    setIsDropDownOpen((state) => !state);
  };

  return (
    <header className={styles.header}>
      <Container className={styles.mainContent}>
        <Logo />
        <Navbar className={styles.navbar} />

        <CartLink count={user?.cart?.lenght || cart?.length} className={styles.cart} />
        {user ? (
          <Link to={"/account"}>
            <Avatar formats={user?.avatar} />
          </Link>
        ) : (
          <>
            <Button asTag={"Link"} to={"/signup"} className={styles.signup}>
              Реєстрація {<Picture alt={"register"} formats={{ jpg: registerImg }} />}
            </Button>

            <Button
              asTag={"Link"}
              to={"/login"}
              type={"outline"}
              className={styles.login}
            >
              Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
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
          <>
            <Button
              asTag={"Link"}
              to={"/signup"}
              onClick={handleClick}
              className={styles.toggle}
            >
              Реєстрація {<Picture alt={"register"} formats={{ jpg: registerImg }} />}
            </Button>
            <Button asTag={"Link"} to={"/login"} type={"outline"} onClick={handleClick}>
              Вхід {<Picture alt={"login"} formats={{ jpg: loginImg }} />}
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
