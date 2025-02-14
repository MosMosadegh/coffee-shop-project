"use client";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";


function Baner() {
  return (
    <div className="h-min">
      <Swiper
        rewind={true}
        loop={true}
        autoplay={{ delay: 1500 }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper home-slider"
      >
        <SwiperSlide className="swiper-slide-contents animated fadeInDown">
          <img  src="/images/fall.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-contents animated fadeInDown">
          <img  src="/images/slide.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-contents animated fadeInDown">
          <img  src="/images/winter-slie.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Baner;
