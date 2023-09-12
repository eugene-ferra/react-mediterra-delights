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
          />
          <Slider>
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
      </div>
      <Footer />
    </>
  );
}

export default App;
