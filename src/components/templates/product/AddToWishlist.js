"use client";
import { getUser } from "@/action/getUser";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({ productID }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        console.log("🚀 ~ fetchUser ~ userData:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const addToWishlist = async (event) => {
    event.preventDefault();
    console.log("🚀 ~ AddToWishlist ~ user:", user);
    if (!user._id) {
      showSwal(
        "برای اضافه به لیست علاقه مندی ها ابتدا وارد حساب خود شوید",
        "error",
        "متوجه شدم"
      );
    }
    const wish = {
      user: user._id,
      product: productID,
    };
    const res = await fetch("/api/wishlist", {
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
  };

  return (
    <div onClick={addToWishlist}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
}

export default AddToWishlist;
