"use client";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TbShoppingCartX } from "react-icons/tb";

const page = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  const removeFromCart = useCallback(
    (id) => {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    [cart]
  );

  const increaseCount = useCallback(
    (id) => {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    [cart]
  );

  const decreaseCount = useCallback(
    (id) => {
      const updatedCart = cart.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    [cart]
  );

  return (
    <>
      <Stepper step="cart" />

      {cart.length > 0 ? (
        <main className={styles.cart} data-aos="fade-up">
          <Table
            cart={cart}
            removeFromCart={removeFromCart}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          />
        </main>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <div>
            <TbShoppingCartX />
          </div>
          <p>سبد خرید شما در حال حاضر خالی است. </p>
          <span>
            قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
          </span>
          <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
