"use client";
import { showSwal } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

function AddToWishlist({productID}) {
const [user, setUser] = useState({})

useEffect(()=>{
    const authUser = async () => {
      const res = await fetch ("/api/auth/me")
      
      if(res.status === 200) {
        const data = await res.json()
        setUser ({...data})
      }
    }
    
    authUser()
},[])

  const addToWishlist = async (event) => {
if(!user._id){
    showSwal("برای اضافه به لیست علاقه مندی ها ابتدا وارد حساب خود شوید","error","متوجه شدم")
}
const wish = {
    user : user._id,
    product: productID
}
const res = await fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wish),
  });
  if (res.status === 201){
    showSwal("محصول به لیست علاقه مندی های شما اضافه شد", "success", "متوجه شدم")
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
