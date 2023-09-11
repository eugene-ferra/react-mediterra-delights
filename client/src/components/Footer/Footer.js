import "./Footer.scss";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import FooterBlocks from "./FooterBlocks";
import FooterBottom from "./FooterBottom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__top">
            <Logo className={"footer__logo"} />
            <Navbar className={"footer__navbar"} />
            <FooterBlocks />
          </div>
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
