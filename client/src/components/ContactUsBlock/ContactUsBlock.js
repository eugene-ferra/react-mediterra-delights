import React from "react";
import "./ContactUsBlock.scss";

function ContactUsBlock({ children, classes }) {
  return (
    <div className={`contact-us-block ${classes && classes}`}>
      <div className="contact-us-block__data">
        <h3 className="contact-us-block__title">
          Забpонюйте столик заздалегіть!{" "}
        </h3>
        <p className="contact-us-block__text">
          Залиште заявку, і наш менеджер звяжеться з вами
        </p>
      </div>

      <form action="#" className="contact-us-block__form">
        <input
          type="text"
          className="contact-us-block__input"
          placeholder="Ім'я"
        />
        <input
          type="text"
          className="contact-us-block__input"
          placeholder="Прізвище"
        />
        <input
          type="tel"
          className="contact-us-block__input"
          placeholder="Телефон"
        />
        {children}
      </form>
    </div>
  );
}

export default ContactUsBlock;
