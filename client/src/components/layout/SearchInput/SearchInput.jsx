import { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import SearchIcon from "../../svg/SearchIcon";
import Button from "../../common/Button/Button";
import styles from "./SearchInput.module.scss";

const SearchInput = ({ value, setValue, isLoading, inputTitle, resetFn }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(internalValue);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [internalValue, setValue]);

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    resetFn();
  };

  const handleReset = () => {
    setInternalValue("");
    setValue("");
    resetFn();
  };

  return (
    <div className={styles.inner}>
      <div className={styles.inputBox}>
        <Input
          className={styles.input}
          value={internalValue}
          disabled={isLoading}
          title={inputTitle}
          onChange={handleChange}
          icon={<SearchIcon />}
        />
      </div>

      <Button onClick={handleReset}>Скинути</Button>
    </div>
  );
};

export default SearchInput;
