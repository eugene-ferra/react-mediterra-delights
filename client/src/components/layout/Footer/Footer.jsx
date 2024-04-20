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
          © 2023 Ukraine Delights. Усі права захищені.
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
