import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import PrevIcon from "../../svg/PrevIcon";
import NextIcon from "../../svg/NextIcon";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Filters.module.scss";

const Filters = ({ filters, resetFilter, initialFilter }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const slides = resetFilter ? filters.length + 1 : filters.length;
  const currentFilterRef = useRef(null);

  const [currentFilter, setCurrentFilter] = useState(initialFilter?.title);

  useEffect(() => {
    if (initialFilter?.isActive) initialFilter?.filter();
  }, [initialFilter]);

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
        {filters?.map((item) => (
          <SwiperSlide key={item.title}>
            <button
              className={item.title === currentFilter ? styles.itemActive : styles.item}
              onClick={() => {
                item?.filter();
                setCurrentFilter(item?.title);
              }}
              ref={item?.title === initialFilter?.title ? currentFilterRef : null}
            >
              {item?.title}
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
