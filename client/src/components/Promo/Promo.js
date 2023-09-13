import "./Promo.scss";
import promoWebp from "../../images/promo.webp";
import promo from "../../images/promo.jpg";

function Promo() {
  return (
    <div className="promo">
      <div className="container">
        <div className="promo__inner">
          <div className="promo__data">
            <h1 className="promo__title">
              Пориньте у світ смаків Середземномор'я!
            </h1>
            <p className="promo__text">
              Вітаємо у ресторані Mediterra Delights, де ви зможете скуштувати
              найкращі страви від наших кухарів. Наше меню насичене вишуканими
              стравами, які сповнені свіжості, аромату та витонченості.
            </p>
            <a href="#" className="button promo__button">
              Переглянути меню
            </a>
            <picture>
              <source
                className="promo__img"
                srcSet={promoWebp}
                type="image/webp"
              />
              <img className="promo__img" src={promo} alt="promo" />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;
