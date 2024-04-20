import Container from "../Container/Container";
import Burger from "../../common/Burger/Burger";
import styles from "./Panel.module.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Text from "../../common/Text/Text";

const Panel = ({ links, children }) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  return (
    <Container className={styles.container}>
      <div className={styles.panel}>
        <aside className={`${isAsideOpen ? styles.asideOpen : styles.aside} `}>
          <Burger
            onClick={() => setIsAsideOpen((state) => !state)}
            isOpen={isAsideOpen}
            className={styles.burger}
          />
          {links.map((item) => (
            <NavLink to={item.to} key={item.text} className={styles.link} end={item.end}>
              <div className={styles.icon}>{item.image}</div>
              <Text className={isAsideOpen ? styles.textOpen : styles.text}>
                {item.text}
              </Text>
            </NavLink>
          ))}
        </aside>
        <div className={styles.manageBox}>{children}</div>
      </div>
    </Container>
  );
};

export default Panel;
