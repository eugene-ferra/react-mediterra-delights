import { useContext } from "react";
import moon from "../../../assets/moon.svg";
import sun from "../../../assets/sun.svg";
import styles from "./SwitchMode.module.scss";
import { ThemeContext } from "../../../App";

const SwitchMode = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const changeTheme = (e) => {
    setIsDark((prevIsDark) => {
      const newIsDark = !prevIsDark;
      const rootElement = document.getElementById("root");
      rootElement.classList.toggle("dark", newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      return newIsDark;
    });

    e.currentTarget.animate(
      [{ transform: "rotateY(180deg)" }, { transform: "rotateY(0deg)" }],
      {
        duration: 300,
        iterations: 1,
      }
    );
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
