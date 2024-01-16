import styles from "./Filters.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { useRef } from "react";
import PrevIcon from "../../svg/PrevIcon";
import NextIcon from "../../svg/NextIcon";
import "swiper/css/navigation";

const Filters = ({ filters, onFilter, resetFilter, currentFilter, filterQuery }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.inner}>
      <button ref={prevRef} className={styles.buttonPrev}>
        <PrevIcon />
      </button>
      <Swiper
        spaceBetween={10}
        slidesPerView={8}
        grabCursor={true}
        modules={[Navigation]}
        className={styles.filters}
        breakpoints={{
          320: {
            centeredSlides: true,
            slidesPerView: 2,
          },
          576: {
            centeredSlides: true,
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
          1440: {
            slidesPerView: 8,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {resetFilter && (
          <SwiperSlide
            className={
              filters?.includes(currentFilter) ? styles.item : styles.itemActive
            }
            key={resetFilter}
            onClick={() => onFilter({})}
          >
            {resetFilter}
          </SwiperSlide>
        )}
        {filters?.map((item) => (
          <SwiperSlide
            className={item === currentFilter ? styles.itemActive : styles.item}
            key={item}
            onClick={() => onFilter({ [filterQuery]: item })}
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      <button ref={nextRef} className={styles.buttonNext}>
        <NextIcon />
      </button>
    </div>
  );
};

export default Filters;
