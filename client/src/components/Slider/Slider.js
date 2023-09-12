import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.scss";

function Slider({ children }) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={true}
      grabCursor={true}
      breakpoints={{
        576: { slidesPerView: 2 },
      }}
    >
      {children}
    </Swiper>
  );
}

export default Slider;
