import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import el from "date-fns/locale/uk";

import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";
import Title from "../Title/Title";
import Text from "../Text/Text";
import styles from "./DateInput.module.scss";

registerLocale("el", el);

const generateExcludedTimes = () => {
  let startTime = new Date();
  startTime.setHours(23, 0, 0, 0);

  let endTime = new Date();
  endTime.setDate(startTime.getDate() + 1);
  endTime.setHours(8, 0, 0, 0);

  let currentTime = new Date(startTime);
  let times = [];

  while (currentTime <= endTime) {
    times.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + 20);
  }

  return times;
};

const DateInput = ({
  placeholder,
  className,
  title,
  errorMessage,
  name,
  disabled,
  type,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <DateComponent
          className={className}
          placeholder={placeholder}
          title={title}
          onChange={onChange}
          errorMessage={errorMessage}
          disabled={disabled}
          type={type}
        />
      )}
      name={name}
      control={control}
    />
  );
};

const DateComponent = ({
  className,
  title,
  errorMessage,
  disabled,
  onChange,
  placeholder,
  type,
}) => {
  const [startDate, setStartDate] = useState(null);
  return (
    <>
      {(!type || type === "default") && (
        <label className={`${className || ""} `}>
          {title && <Title type={"input"}>{title}</Title>}

          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              onChange(
                new Date(
                  date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
                ).toISOString()
              );
            }}
            showTimeSelect
            className={styles.input}
            placeholderText={placeholder}
            timeFormat="p"
            timeIntervals={20}
            excludeTimes={generateExcludedTimes()}
            dateFormat="dd/MM/yyyy HH:mm "
            locale="el"
            disabled={disabled}
            todayButton="Cьогодні"
            calendarClassName={styles.calendar}
            timeCaption="Час"
          />

          {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
        </label>
      )}

      {type === "year-month-day" && (
        <label className={`${className || ""} `}>
          {title && <Title type={"input"}>{title}</Title>}

          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              onChange(
                new Date(
                  date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
                ).toISOString()
              );
            }}
            showYearDropdown
            showMonthDropdown
            className={styles.input}
            placeholderText={placeholder}
            dateFormat="dd/MM/yyyy"
            locale="el"
            disabled={disabled}
            calendarClassName={styles.calendar}
          />

          {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
        </label>
      )}

      {type === "year-month" && (
        <label className={`${className || ""} `}>
          {title && <Title type={"input"}>{title}</Title>}

          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              onChange(
                new Date(
                  date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
                ).toISOString()
              );
            }}
            showMonthYearPicker
            className={styles.input}
            placeholderText={placeholder}
            dateFormat="MM/yyyy"
            locale="el"
            disabled={disabled}
            calendarClassName={styles.calendar}
          />

          {errorMessage && <Text type={"error"}>{errorMessage}</Text>}
        </label>
      )}
    </>
  );
};

export default DateInput;
