import { useRef } from "react";
import styles from "./Gallery.module.scss";
import PrevIcon from "../svg/PrevIcon";
import "swiper/css";
import { Keyboard, Navigation } from "swiper/modules";
import NextIcon from "../svg/NextIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../common/Container/Container";
import Loader from "../common/Loader/Loader";
import ErrorMassage from "../common/ErrorMassage/ErrorMassage";

const Gallery = ({ items, isLoading, error, top }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Container>
      {(error || isLoading) && top}
      {isLoading && (
        <div style={{ padding: "20px 0" }}>
          <Loader type={"global"} />
        </div>
      )}
      {error && (
        <div style={{ padding: "20px 0" }}>
          <ErrorMassage status={error?.status} />
        </div>
      )}
      {items && (
        <div className={styles.inner}>
          {top}
          <Swiper
            keyboard={{ enabled: true }}
            spaceBetween={10}
            slidesPerView={5}
            grabCursor={true}
            modules={[Navigation, Keyboard]}
            className={styles.slider}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 5,
              },
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {items?.map((item, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                {item}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.pagination}>
            <button ref={prevRef} className={styles.buttonPrev}>
              <PrevIcon />
            </button>
            <button ref={nextRef} className={styles.buttonNext}>
              <NextIcon />
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Gallery;
