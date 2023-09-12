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

//temporary
import workersWebp from "../../images/workers.webp";
import workers from "../../images/workers.jpg";

function App() {
  return (
    <>
      <Header />
      <div>
        <Promo />

        <About />

        <Gallery>
          <HeadBlock
            text={"Наші страви"}
            link={"#"}
            modifier={"head-block--dark"}
            linkText={"Усе меню"}
          />
          <Slider slidesMob={1} slides={2}>
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

        <AboutWorkers />

        <Gallery>
          <HeadBlock text={"Фотогалерея"} modifier={"head-block--dark"} />
          <Slider slides={4} slidesMob={1}>
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
                <img src={workers} alt="photo" />
              </picture>
            </SwiperSlide>
          </Slider>
        </Gallery>
      </div>
      <Footer />
    </>
  );
}

export default App;
