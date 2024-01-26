import { useState } from "react";
import moon from "../../../assets/moon.svg";
import sun from "../../../assets/sun.svg";
import styles from "./SwitchMode.module.scss";

const SwitchMode = () => {
  const [isDark, setisDark] = useState(
    document.getElementById("root").classList.dark || false
  );
  const changeTheme = () => {
    setisDark((state) => !state);
    document.getElementById("root").classList.toggle("dark");
  };

  return (
    <button onClick={changeTheme} className={styles.mode}>
      {isDark ? (
        <img src={moon} alt="dark" key={1} />
      ) : (
        <img src={sun} alt="light" key={2} />
      )}
    </button>
  );
};

export default SwitchMode;
