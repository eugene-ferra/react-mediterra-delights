import "./Footer.scss";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__top">
            <Logo className={"footer__logo"} />
            <Navbar className={"footer__navbar"} />
            <div className="footer__blocks">
              <div className="footer__block">
                <address className="footer__block-line">
                  вул. Сумська, 123, Харків
                </address>
                <p className="footer__block-line">Пн-Пт: 08:00 - 22:00,</p>
                <p className="footer__block-line">Сб-Нд: 09:00 - 20:00</p>
              </div>
              <div className="footer__block">
                <a
                  href="mailto:info@mediterradelights.com"
                  className="footer__block-line"
                >
                  info@mediterradelights.com
                </a>
                <a href="tel:0959333933" className="footer__block-line">
                  (095) 933-39-33
                </a>
                <a href="tel:0800585512" className="footer__block-line">
                  0 800 585 512
                </a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            © 2023 Mediterra Delights. Усі права захищені.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
