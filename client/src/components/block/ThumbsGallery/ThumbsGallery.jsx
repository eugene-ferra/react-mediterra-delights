import { useLayoutEffect, useRef, useState } from "react";
import PrevIcon from "../../svg/PrevIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Keyboard, Navigation, Thumbs } from "swiper/modules";
import Picture from "../../common/Picture/Picture";
import NextIcon from "../../svg/NextIcon";
import styles from "./ThumbsGallery.module.scss";

const ThumbsGallery = ({ images, alt }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [firstSwiper] = useState();
  const [secondSwiper] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <>
      <div className={styles.inner}>
        <div className={styles.top}>
          <button ref={prevRef} className={styles.buttonPrev}>
            <PrevIcon />
          </button>
          <Swiper
            zoom={true}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className={styles.slider}
            onSwiper={(swiper) => {
              if (swiper1Ref.current !== null) {
                swiper1Ref.current = swiper;
              }
            }}
            controller={{ control: secondSwiper }}
            spaceBetween={10}
            slidesPerView={1}
            keyboard={{
              enabled: true,
              onlyInViewport: false,
            }}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Navigation, Thumbs, Controller, Keyboard]}
          >
            {images?.map((imgObj, i) => (
              <SwiperSlide key={i} className={styles.slide}>
                <Picture formats={imgObj} alt={`${alt}-${i}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button ref={nextRef} className={styles.buttonNext}>
            <NextIcon />
          </button>
        </div>
        <Swiper
          className={styles.thumbs}
          controller={{ control: firstSwiper }}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          slideToClickedSlide={true}
          onSwiper={setThumbsSwiper}
          modules={[Navigation, Thumbs, Controller]}
        >
          {images?.map((imgObj, i) => (
            <SwiperSlide
              key={i}
              className={activeIndex === i ? styles.thumbActive : styles.thumb}
            >
              <Picture formats={imgObj} alt={`${alt}-${i}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ThumbsGallery;
