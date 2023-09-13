import "./About.scss";
import about1Webp from "../../images/about1.webp";
import about2Webp from "../../images/about2.webp";
import about1 from "../../images/about1.jpg";
import about2 from "../../images/about2.jpg";

function About({ children }) {
  return (
    <div className="about">
      <div className="container">
        {children}
        <div className="about__inner">
          <div className="about__column">
            <div className="about__text">
              Mediterra Delights - захоплюючий ресторан, який оживляє яскраві
              смаки та кулінарні традиції Середземномор'я. Знаходячись у самому
              серці міста, наш ресторан пропонує вам неповторний кулінарний
              досвід, що перенесе вас на сонячні береги Середземного моря. А
              наша затишна та стильна атмосфера відображає теплоту та
              привабливість цього регіону.
            </div>
            <picture className="about__picture">
              <source
                className="about__image"
                srcSet={about1Webp}
                type="image/webp"
              />
              <img className="about__image" src={about1} alt="about us" />
            </picture>
          </div>
          <div className="about__column about__column--reverse">
            <div className="about__text">
              Незалежно від того, насолоджуєтеся ви романтичним вечором,
              святкуєте особливу подію чи просто збираєтесь з друзями та
              родиною, Mediterra Delights гарантує Вам розслаблену атмосферу, та
              незабутні враження . Наш уважний та кваліфікований персонал
              допоможе вам пройти кулінарну подорож, переконавшись, що кожна
              мить наповнена задоволенням.
            </div>
            <picture className="about__picture">
              <source
                className="about__image"
                srcSet={about2Webp}
                type="image/webp"
              />
              <img className="about__image" src={about2} alt="about us" />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
