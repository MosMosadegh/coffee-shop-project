import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";

const Latest = ({ product }) => {

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>Latest products</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />
        </Link>
      </section>
      <main
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="2500"
        className={styles.products}
      >
        {product.map((item) => (
          <Product key={item._id} {...item} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
