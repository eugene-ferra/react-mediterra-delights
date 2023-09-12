import logo from "../../images/logo.svg";
import "./Logo.scss";

function Logo({ className }) {
  return (
    <a href="#" className={`logo ${className ? className : ""}`}>
      <img className="logo__image" src={logo} alt="logo" />
    </a>
  );
}

export default Logo;
