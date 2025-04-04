import Link from "next/link";
import Order from "./Order";
import styles from "./orders.module.css";
import { FaArrowLeft } from "react-icons/fa6";

const Orders = ({ orders }) => {
  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <p>سفارش های اخیر</p>
        <Link href="/p-user/orders">
          همه سفارش ها <FaArrowLeft />
        </Link>
      </div>
      {orders.length > 0 ? (
        orders.map((item) => <Order {...orders} />)
      ) : (
        <p className={styles.empty}>سفارشی ثبت نشده</p>
      )}
    </div>
  );
};

export default Orders;
