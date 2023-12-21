import styles from "./ErrorMassage.module.scss";

const ErrorMassage = ({ status }) => {
  let text;

  switch (status) {
    case 400:
      text = "Не вдалося завантажити дані!";
      break;
    case 404:
      text = "Нічого не знайдено!";
      break;

    default:
      text = "Сталася непередбачувана помилка при завантаженні даних!";
  }

  return <div className={styles.errorMessage}>{text}</div>;
};

export default ErrorMassage;
