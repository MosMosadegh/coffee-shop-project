"use client";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import { useEffect } from "react";

const MoreProducts = ({ smell, productID }) => {
   const { data: relatedProduct, isLoading, isError } = useQuery({
    queryKey: ["relatedProduct", smell, productID],
    queryFn: () =>
      fetch(`/api/product/related?smell=${smell}&productID=${productID}`).then(
        (res) => res.json()
      ),
  });

  useEffect(() => {
    AOS.init({ duration: 1000 }); // تنظیم مدت زمان انیمیشن
    AOS.refresh(); // بروزرسانی AOS پس از تغییرات در DOM
  }, [relatedProduct]);

  if (isLoading) return <div>Loading related products...</div>;
  if (isError) return <div>Error loading related products</div>;

  return (
    <div data-aos="fade-right" >
      <section>
        <h2>محصولات مرتبط</h2>
        <div
          style={{
            height: "2px",
            width: "70px",
            background: "black",
            marginTop: "10px",
          }}
        ></div>
      </section>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        dir="rtl"
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper "
      >
        {relatedProduct?.length > 0 ? (
          relatedProduct.map((product) => (
            <SwiperSlide key={product._id}>
              <Product product={product} />
            </SwiperSlide>
          ))
        ) : (
          <p>محصول مرتبطی یافت نشد.</p>
        )}
      </Swiper>
    </div>
  );
};

export default MoreProducts;
