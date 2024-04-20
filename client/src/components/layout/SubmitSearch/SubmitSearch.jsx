import { useState } from "react";
import { Form } from "react-router-dom";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import styles from "./SubmitSearch.module.scss";

const SubmitSearch = ({ setValue, isLoading, children, inputTitle }) => {
  const [inputValue, setInputValue] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setValue(inputValue);
  };

  return (
    <div className={styles.inner}>
      <Form className={styles.form} onSubmit={onSubmit}>
        <Input
          style={{ width: "300px" }}
          title={inputTitle}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button disabled={!inputValue || isLoading}>Пошук</Button>
      </Form>

      {children}
    </div>
  );
};

export default SubmitSearch;
