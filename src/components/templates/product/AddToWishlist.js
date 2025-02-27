"use client";
import { useSession } from "next-auth/react";
import { showSwal } from "@/utils/helpers";
import React from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({ productID }) {
  const { data: session } = useSession();

  const addToWishlist = async (event) => {
    event.preventDefault();

    if (!session) {
      showSwal(
        "برای اضافه به لیست علاقه مندی ها ابتدا وارد حساب خود شوید",
        "error",
        "متوجه شدم"
      );
    } else {
      const wish = {
        user: session.user.id,
        product: productID,
      };
      const res = await fetch("/api/wishlist/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wish),
      });
      if (res.status === 201) {
        showSwal(
          "محصول به لیست علاقه مندی های شما اضافه شد",
          "success",
          "متوجه شدم"
        );
      }
    }
  };

  return (
    <div onClick={addToWishlist}>
      <CiHeart />
    </div>
  );
}

export default AddToWishlist;
