"use client";
import { useQuery } from "@tanstack/react-query";
import styles from "./allProduct.module.css";
import Product from "@/components/modules/product/Product";

const AllProduct = () => {
  const {
    data: allProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: () => fetch("/api/product/get").then((res) => res.json()),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>Error loading product</div>;

  return (
    <>
      <section className={styles.title}>
        <div>
          <p>همه محصولات</p>
          <span>َAll products</span>
        </div>
      </section>
      <main
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="2500"
        className={`${styles.products} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 child:bg-white child:dark:bg-zinc-700 child:rounded-2xl child:shadow-normal`}
      >
        {allProduct?.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </main>
    </>
  );
};

export default AllProduct;
