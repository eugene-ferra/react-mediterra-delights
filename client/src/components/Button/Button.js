import "./Button.scss";

function Button({ text, classes, icon }) {
  return (
    <button className={`button ${classes ? classes : ""}`}>
      {text}
      <img className="button__img" src={icon} alt={text} />
    </button>
  );
}
export default Button;
