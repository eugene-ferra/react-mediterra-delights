import { useCallback, useRef, useState } from "react";
import PrevIcon from "../../svg/PrevIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Keyboard, Navigation, Thumbs } from "swiper/modules";
import Picture from "../../common/Picture/Picture";
import NextIcon from "../../svg/NextIcon";
import styles from "./ThumbsGallery.module.scss";

const ThumbsGallery = ({ images, alt }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiper1Ref = useRef(null);
  const swiper2Ref = useRef(null);

  // console.log(swiper1Ref.current.swiper.activeIndex);

  const handlePrev = useCallback(() => {
    if (!swiper1Ref.current) return;
    swiper1Ref.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiper1Ref.current) return;
    swiper1Ref.current.swiper.slideNext();
  }, []);

  return (
    <>
      <div>
        <div className={styles.top}>
          <button
            className={styles.buttonPrev}
            onClick={handlePrev}
            disabled={swiper1Ref?.current?.swiper.activeIndex == 0}
          >
            <PrevIcon />
          </button>
          <Swiper
            ref={swiper1Ref}
            zoom={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className={styles.slider}
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
          <button
            className={styles.buttonNext}
            onClick={handleNext}
            disabled={swiper1Ref?.current?.swiper.activeIndex == images.length - 1}
          >
            <NextIcon />
          </button>
        </div>
        <Swiper
          ref={swiper2Ref}
          className={styles.thumbs}
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
