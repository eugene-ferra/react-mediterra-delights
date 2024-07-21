import { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PrevIcon from "../../svg/PrevIcon";
import { Keyboard, Navigation } from "swiper/modules";
import NextIcon from "../../svg/NextIcon";
import Container from "../Container/Container";
import Loader from "../../common/Loader/Loader";
import ErrorMassage from "../../common/ErrorMassage/ErrorMassage";
import "swiper/css";
import styles from "./Gallery.module.scss";

const Gallery = ({ items, isLoading, error, top, breakpoints, height }) => {
  let sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Container>
      {(error || isLoading) && top}

      {isLoading && <Loader type={"global"} />}

      {error && <ErrorMassage status={error?.status} />}

      {items && (
        <div className={styles.inner}>
          {top}
          <Swiper
            ref={sliderRef}
            keyboard={{ enabled: true }}
            spaceBetween={10}
            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Keyboard]}
            className={styles.slider}
            style={{ height: height }}
            breakpoints={
              breakpoints || {
                320: {
                  slidesPerView: 1.1,
                },
                450: {
                  slidesPerView: 1.5,
                },
                576: {
                  slidesPerView: 2.2,
                },
                768: {
                  slidesPerView: 3.1,
                },
                992: {
                  slidesPerView: 3.2,
                },
                1200: {
                  slidesPerView: 4.2,
                },
                1440: {
                  slidesPerView: 5.2,
                },
              }
            }
          >
            {items?.map((item, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                {item}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.pagination}>
            <button className={styles.buttonPrev} onClick={handlePrev}>
              <PrevIcon />
            </button>
            <button className={styles.buttonNext} onClick={handleNext}>
              <NextIcon />
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Gallery;
