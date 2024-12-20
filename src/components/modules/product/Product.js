import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({ _id, name, price, score, img }) => {
  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <img src={img} alt="" />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${_id}`}>{name}</Link>
        <div className="flex justify-center">
          {score &&
            new Array(score)
              .fill(0)
              .map((item, index) => <FaStar key={index} />)}

          {score &&
            new Array(5 - score)
              .fill(0)
              .map((item, index) => <FaRegStar key={index} />)}
        </div>
        <span>{price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
