import "./Button.scss";

function Button({ text, classes, icon }) {
  return (
    <button className={`button ${classes}`}>
      {text}
      <img src={icon} alt={text} />
    </button>
  );
}
export default Button;
