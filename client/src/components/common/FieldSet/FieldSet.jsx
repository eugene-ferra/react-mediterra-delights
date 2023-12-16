import styles from "./FieldSet.module.scss";

const FieldSet = ({ children, title }) => {
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <fieldset className={styles.fieldSet}>{children}</fieldset>
    </div>
  );
};

export default FieldSet;
