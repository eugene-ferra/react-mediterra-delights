import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = ({ className, onClick }) => {
  return (
    <nav className={`${styles.navbar} ${className || ""}`}>
      <NavLink to={"/about"} onClick={onClick}>
        Про нас
      </NavLink>
      <NavLink to={"/workers"} onClick={onClick}>
        Працівники
      </NavLink>
      <NavLink to={"/products"} onClick={onClick}>
        Меню
      </NavLink>
      <NavLink to={"/articles"} onClick={onClick}>
        Статті
      </NavLink>
      <NavLink to={"/contacts"} onClick={onClick}>
        Контакти
      </NavLink>
    </nav>
  );
};

export default Navbar;
