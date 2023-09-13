import "./Dish.scss";
import dishWebp from "../../images/dish.webp";
import dish from "../../images/dish.jpg";

function Dish() {
  return (
    <a href="#" className="card">
      <div className="card__inner">
        <picture className="card__picture">
          <source className="card__img" srcSet={dishWebp} type="image/webp" />
          <img className="card__img" src={dish} alt="name" />
        </picture>
        <div className="card__data">
          <h3 className="card__title">Шакшука</h3>
          <div className="card__rating">
            <div className="card__stars">
              <div
                className="card__stars-active"
                style={{ width: "70%" }}
              ></div>
            </div>
            <p className="card__reviews">5 відгуків</p>
          </div>
          <div className="card__info">
            <span className="card__weight">300 г</span>
            <span className="card__price">135 грн</span>
          </div>

          <p className="card__text">
            "Шакшука" - це аутентична середземноморська страва, яка стала одним
            з найпопулярніших сніданків у багатьох країнах. Це смажені яйця,
            зварені у соусі з томатів, перцю, цибулі та спецій.
          </p>
        </div>
      </div>
    </a>
  );
}

export default Dish;
