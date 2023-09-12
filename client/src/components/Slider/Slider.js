import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

function Slider({ slides, slidesMob, children }) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={slidesMob}
      pagination={{ clickable: true }}
      navigation={true}
      grabCursor={true}
      breakpoints={{
        576: { slidesPerView: slides },
      }}
    >
      {children}
    </Swiper>
  );
}

export default Slider;
