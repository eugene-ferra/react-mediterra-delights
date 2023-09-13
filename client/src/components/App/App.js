import Header from "../Header/Header";
import "./App.scss";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import About from "../About/About";
import Dish from "../Dish/Dish";
import Gallery from "../Gallery/Gallery";
import HeadBlock from "../HeadBlock/HeadBlock";
import { SwiperSlide } from "swiper/react";
import Slider from "../Slider/Slider";
import AboutWorkers from "../AboutWorkers/AboutWorkers";
import Logo from "../Logo/Logo";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import signUp from "../../images/sign_up.svg";
import login from "../../images/login.svg";
import { useState } from "react";

//temporary
import workersWebp from "../../images/workers.webp";
import workers from "../../images/workers.jpg";
import Main from "../Main/Main";

function App() {
  return (
    <>
      <Header
        logo={<Logo className={"header__logo"} />}
        content={<Navbar className="header__navbar" />}
        sign={
          <>
            <Button
              text={"Реєстрація"}
              classes={"button--mini button--outline"}
              icon={signUp}
            />
            <Button
              text={"Вхід"}
              classes={"button button--mini"}
              icon={login}
            />
          </>
        }
      />

      <Main>
        <Promo />

        <About>
          <HeadBlock
            link={"#"}
            text={"Про нас"}
            linkText={"Більше інформації "}
          />
        </About>

        <Gallery>
          <HeadBlock
            text={"Наші страви"}
            link={"#"}
            modifier={"head-block--dark"}
            linkText={"Усе меню"}
          />
          <Slider slidesMob={2} slides={2}>
            <SwiperSlide>
              <Dish />
            </SwiperSlide>
            <SwiperSlide>
              <Dish />
            </SwiperSlide>
            <SwiperSlide>
              <Dish />
            </SwiperSlide>
            <SwiperSlide>
              <Dish />
            </SwiperSlide>
          </Slider>
        </Gallery>

        <AboutWorkers>
          <HeadBlock text={"Персонал"} link={"#"} linkText={"Всі працівники"} />
        </AboutWorkers>

        <Gallery>
          <HeadBlock text={"Фотогалерея"} modifier={"head-block--dark"} />
          <Slider slides={4} slidesMob={2} slidesTablet={3}>
            <SwiperSlide>
              <picture>
                <source srcSet={workersWebp} type="image/webp" />
                <img src={workers} alt="p1" />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source srcSet={workersWebp} type="image/webp" />
                <img src={workers} alt="photo" />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source srcSet={workersWebp} type="image/webp" />
                <img src={workers} alt="photo" />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source srcSet={workersWebp} type="image/webp" />
                <img src={workers} alt="photo" />
              </picture>
            </SwiperSlide>
            <SwiperSlide>
              <picture>
                <source srcSet={workersWebp} type="image/webp" />
                <img src={workers} alt="workers" />
              </picture>
            </SwiperSlide>
          </Slider>
        </Gallery>
      </Main>
      <Footer>
        <Logo className={"footer__logo"} />
        <Navbar className={"footer__navbar"} />
      </Footer>
    </>
  );
}

export default App;
