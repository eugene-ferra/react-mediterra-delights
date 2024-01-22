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
  const slides = resetFilter ? filters.length + 1 : filters.length;

  return (
    <div className={styles.inner}>
      <button ref={prevRef} className={styles.buttonPrev}>
        <PrevIcon />
      </button>

      <Swiper
        keyboard={{ enabled: true }}
        spaceBetween={10}
        slidesPerView={Math.min(7, slides)}
        grabCursor={true}
        modules={[Navigation]}
        className={styles.filters}
        breakpoints={{
          320: {
            slidesPerView: Math.min(2, slides),
          },
          576: {
            slidesPerView: Math.min(3, slides),
          },
          768: {
            slidesPerView: Math.min(4, slides),
          },
          992: {
            slidesPerView: Math.min(5, slides),
          },
          1200: {
            slidesPerView: Math.min(6, slides),
          },
          1440: {
            slidesPerView: Math.min(7, slides),
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
          <SwiperSlide key={resetFilter}>
            <button
              className={
                filters?.includes(currentFilter) ? styles.item : styles.itemActive
              }
              onClick={() => onFilter({})}
            >
              {resetFilter}
            </button>
          </SwiperSlide>
        )}
        {filters?.map((item) => (
          <SwiperSlide key={item}>
            <button
              className={item === currentFilter ? styles.itemActive : styles.item}
              onClick={() => onFilter({ [filterQuery]: item })}
            >
              {item}
            </button>
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
