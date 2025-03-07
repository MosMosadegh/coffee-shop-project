import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";

const Latest = ({ product }) => {

  return (
    <div className="">
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div >
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />
        </Link>
      </section>
      <main
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="2500"
        className={`${styles.products} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5 child:bg-white child:dark:bg-zinc-700 child:rounded-2xl child:shadow-normal`}
      >
        {product.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
