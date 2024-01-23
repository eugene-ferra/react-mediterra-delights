import Select from "react-select";
import styles from "./InputSelect.module.scss";
import { Controller, useFormContext } from "react-hook-form";

const InputSelect = ({
  placeholder,
  title,
  valuesArr,
  errorMessage,
  name,
  disabled,
  value,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <SelectComponent
          placeholder={placeholder}
          title={title}
          valuesArr={valuesArr}
          onChange={onChange}
          errorMessage={errorMessage}
          disabled={disabled}
          value={value}
        />
      )}
      name={name}
      control={control}
    />
  );
};

const SelectComponent = ({
  placeholder,
  title,
  valuesArr,
  errorMessage,
  onChange,
  disabled,
}) => {
  const colourStyles = {
    control: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: "transparent",
      borderWidth: "2px",
      borderRadius: 0,
      outlineWidth: 0,
      padding: "2px 5px 2px 5px ",
      "&:hover": {
        borderColor:
          isSelected || isFocused ? "var(--selection-color)" : "var(--secondary-color)",
      },
      borderColor: disabled
        ? "#848588"
        : isSelected || isFocused
        ? "var(--selection-color)"
        : "var(--secondary-color)",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "var(--secondary-light-color)",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "400",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "var(--secondary-color)",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "400",
    }),
    input: (styles) => ({
      ...styles,
      color: "var(--secondary-color)",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "400",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      svg: {
        fill: "var(--secondary-color)",
      },
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        transition: "var(--transition)",

        backgroundColor: isSelected
          ? "var(--selection-color)"
          : isFocused
          ? "var(--selection-light-color)"
          : "var(--primary-color)",

        color: isSelected ? "var(--primary-stable-color)" : "var(--secondary-color)",

        cursor: "pointer",
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        borderRadius: 0,
        backgroundColor: "var(--primary-color)",
      };
    },
  };

  return (
    <div>
      <p className={styles.inputTitle}>{title}</p>
      <Select
        placeholder={placeholder}
        options={valuesArr?.map((item) => {
          return { value: item, label: item };
        })}
        styles={colourStyles}
        onChange={(value) => {
          onChange(value.value);
        }}
        isDisabled={disabled}
        noOptionsMessage={() => "Таких варінтів не знайдено!"}
      />
      <p className={styles.inputError}>{errorMessage}</p>
    </div>
  );
};

export default InputSelect;
