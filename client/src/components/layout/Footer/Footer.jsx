import Container from "../Container/Container";
import Logo from "../../common/Logo/Logo";
import Navbar from "../../block/Navbar/Navbar";
import Text from "../../common/Text/Text";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.mainContent}>
        <Logo />
        <Navbar />
        <Text className={styles.copyright} type={"small"} align={"center"}>
          © {new Date().getFullYear()} Ukraine Delights. Усі права захищені.
          <br />
          Дизайн та розробка:
          <a href="https://t.me/eugene_ferra">
            {" "}
            <b style={{ textDecoration: "underline" }}>
              Eugene Kushnir - fullstack web-developer
            </b>
          </a>
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
