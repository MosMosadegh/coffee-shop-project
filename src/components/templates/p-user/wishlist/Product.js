"use client";
import Image from "next/image";
import styles from "./product.module.css";
import Link from "next/link";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import swal from "sweetalert";

const Card = ({ price, score, name, productID, img }) => {
  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/wishlist/${productID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          swal({
            title: "محصول مورد نظر از علاه مندی ها حذف شد",
            icon: "success",
            buttons: "متوجه شدم",
          }).then(() => {
            location.reload();
          });
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${productID}`}>
        <Image width={283} height={283} src={img} alt="" />
      </Link>
      <p dir="rtl">{name}</p>
      <div>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <IoMdStar key={index} />
          ))}
          {new Array(5 - score).fill(0).map((item, index) => (
            <IoMdStarOutline key={index} />
          ))}
        </div>
        <span>{price.toLocaleString()} تومان</span>
      </div>
      <button onClick={removeProduct} className={styles.delete_btn}>
        حذف محصول
      </button>
    </div>
  );
};


export default Card;
