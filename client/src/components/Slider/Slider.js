import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

function Slider({ slides, slidesMob, slidesTablet, children }) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={20}
      autoHeight={true}
      pagination={{ clickable: true }}
      navigation={true}
      grabCursor={true}
      breakpoints={{
        320: { slidesPerView: 1 },
        576: { slidesPerView: slidesMob },
        768: { slidesPerView: slidesTablet ? slidesTablet : slides },
        992: { slidesPerView: slides },
      }}
    >
      {children}
    </Swiper>
  );
}

export default Slider;
