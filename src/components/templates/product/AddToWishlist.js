"use client";
import { getUser } from "@/action/getUser";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import styles from "./AddToWishlist.module.css";

function AddToWishlist({ productID }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();

    if (!user) {
      showSwal(
        "برای اضافه به لیست علاقه مندی ها ابتدا وارد حساب خود شوید",
        "error",
        "متوجه شدم"
      );
    } else {
      const wish = {
        user: user?._id,
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
      <CiHeart  />
    </div>
  );
}

export default AddToWishlist;
