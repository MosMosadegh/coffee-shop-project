"use client";
import React from "react";
import { showSwal } from "@/utils/helpers";

function AddToShoppingBasket({product, count}) {
  

  const addToCard = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const pushToCart = () => {
      const cardItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        count: count? count : 1,
      };
      cart.push(cardItem);

      localStorage.setItem("cart", JSON.stringify(cart));
      showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
    };

    if (cart.length) {
      const isInCart = cart.some((item) => item.id === product._id);

      if (isInCart) {
        cart.forEach((item) => {
          if (item.id == product._id) {
            item.count = item.count + count;
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
      } else {
        pushToCart();
      }
    } else {
      pushToCart();
    }
  };

  return (
    <>
      <button onClick={addToCard}>افزودن به سبد خرید</button>
    </>
  );
}

export default AddToShoppingBasket;
