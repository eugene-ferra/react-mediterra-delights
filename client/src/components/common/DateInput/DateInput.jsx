import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import el from "date-fns/locale/uk";
import styles from "./DateInput.module.scss";

import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";

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

const DateInput = ({ placeholder, className, title, errorMessage, name, disabled }) => {
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
}) => {
  const [startDate, setStartDate] = useState(null);
  return (
    <label className={`${className || ""} `}>
      <p className={styles.inputTitle}>{title}</p>

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
        className={styles.input}
        showTimeSelect
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

      <p className={styles.inputError}>{errorMessage}</p>
    </label>
  );
};

export default DateInput;
