import React from "react";
import HeadBlock from "../HeadBlock/HeadBlock";
import "./AboutWorkers.scss";
import workersWebp from "../../images/workers.webp";
import workers from "../../images/workers.jpg";

function AboutWorkers() {
  return (
    <section className="about-workers">
      <div className="container">
        <HeadBlock text={"Персонал"} link={"#"} linkText={"Всі працівники"} />
        <div className="about-workers__inner">
          <picture className="about-workers__picture">
            <source
              className="about-workers__img"
              srcSet={workersWebp}
              type="image/webp"
            />
            <img className="about-workers__img" src={workers} alt="workers" />
          </picture>
          <p className="about-workers__text">
            Mediterra Delights засновано в 2010 році з бажання створити
            унікальний простір, який втілює дух та смаки Середземного моря. За
            роки свого існування ми зарекомендували себе як провідний ресторан
            середземноморської кухні, завдяки нашим високим стандартам якості,
            неперевершеним стравам та винятковому обслуговуванню. Ми горді бути
            частиною багатої історії середземноморської кухні та раді поділитися
            цим досвідом з нашими гостями. Наш ресторан - це місце, де ви
            зможете насолоджуватися найкращими смаками регіону, почути цікаві
            історії та зануритися у неперевершену атмосферу Середземного моря.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutWorkers;
