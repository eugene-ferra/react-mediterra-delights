import BlockHeader from "../BlockHeader/BlockHeader";
import Container from "../Container/Container";
import styles from "./AboutBlock.module.scss";

const AboutBlock = ({ children, title, linkText, to, reverse }) => {
  return (
    <Container>
      <div className={styles.inner}>
        {title && <BlockHeader title={title} linkText={linkText} to={to} />}

        <div
          className={styles.aboutItem}
          style={{ flexDirection: reverse ? "row-reverse" : "row" }}
        >
          {children}
        </div>
      </div>
    </Container>
  );
};

export default AboutBlock;
