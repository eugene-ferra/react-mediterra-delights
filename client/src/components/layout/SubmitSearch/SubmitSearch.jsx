import { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import styles from "./SubmitSearch.module.scss";
import Form from "../Form/Form";
import Loader from "../../common/Loader/Loader";

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
          className={styles.input}
          title={inputTitle}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button disabled={!inputValue || isLoading}>
          {isLoading && <Loader type={"small"} />} Пошук
        </Button>
      </Form>

      {children}
    </div>
  );
};

export default SubmitSearch;
