"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";

const Gallery = ({ productImg }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = [
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg",
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-box-DG--150x150.jpg",
    "https://set-coffee.com/wp-content/uploads/2020/12/Gold-box-DG--150x150.jpg",
  ];

  return (
    <section style={{ width: "36%" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image width={600} height={600} src={productImg} alt="Product" />
            {/* <img src={img} /> */}
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={productImg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
