import Container from "../Container/Container";
import Title from "../../common/Title/Title";
import Button from "../../common/Button/Button";
import Picture from "../../common/Picture/Picture";
import styles from "./PageError.module.scss";

const PageError = ({ title, pic, linkText, to, alt }) => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <Title align={"center"}>{title}</Title>

        {linkText && to && (
          <Button asTag={"Link"} to={"/"} type={"back"}>
            {linkText}
          </Button>
        )}

        <Picture className={styles.image} formats={{ jpg: pic }} alt={alt} />
      </div>
    </Container>
  );
};

export default PageError;
