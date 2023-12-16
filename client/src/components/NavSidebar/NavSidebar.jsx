import Picture from "../common/Picture/Picture";
import styles from "./NavSidebar.module.scss";
import { NavLink } from "react-router-dom";
import Text from "../common/Text/Text";
import Burger from "../common/Burger/Burger";
import { useState } from "react";

const NavSidebar = ({ links, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`${isOpen ? styles.asideOpen : styles.aside} ${className || ""}`}>
      <Burger
        onClick={() => setIsOpen((state) => !state)}
        isOpen={isOpen}
        className={styles.burger}
      />
      {links.map((item) => (
        <NavLink to={item.to} key={item.text} className={styles.link} end={item.end}>
          <Picture
            className={styles.linkIcon}
            formats={{
              jpg: item.image,
            }}
          />
          <Text className={isOpen ? styles.textOpen : styles.text}>{item.text}</Text>
        </NavLink>
      ))}
    </aside>
  );
};

export default NavSidebar;
