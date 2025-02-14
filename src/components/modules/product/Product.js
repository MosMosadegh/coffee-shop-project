"use client"
import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import Image from "next/image";
import AddToWishlist from "@/components/templates/product/AddToWishlist";
import AddToShoppingBasket from "@/components/templates/product/AddToShoppingBasket";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";

const Card = ({ product }) => {
// const Card = ({ _id, name, price, score, img }) => {
  const fastShow = (body) => {
        Swal.fire({
          title: "توضیحات: ",
          text: body,
          icon: "question"
        });
    // showSwal(body, undefined, "بستن");
  };

  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <Image width={200} height={312} src={product.img} alt="Product" />

        <div className={styles.icons}>
          <div  onClick={()=>fastShow(product.longDescription)}>
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </div>
          <div>
            <AddToWishlist productID={product._id} />
            
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <AddToShoppingBasket product={product} />
      </div>

      <div className={styles.details}>
        <Link href={`/product/${product._id}`} className="hover:bg-slate-200">{product.name}</Link>
        <div className="flex justify-center">
          {product.score &&
            new Array(product.score)
              .fill(0)
              .map((item, index) => <FaStar key={index} />)}

          {product.score &&
            new Array(5 - product.score)
              .fill(0)
              .map((item, index) => <FaRegStar key={index} />)}
        </div>
        <span>{product.price?.toLocaleString()} تومان</span>
      </div>
    </div>
  );
};

export default Card;
