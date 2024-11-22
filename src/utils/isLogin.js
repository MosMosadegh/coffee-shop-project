"use client";
import connectToDb from "@/configs/db";
import React, { useEffect, useState } from "react";

export const isLogin = async () => {
  await connectToDb
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/isLogin", {
        method: "GET",
        credentials: "include", // برای ارسال کوکی‌ها
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated.name);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  return isLoggedIn;
};
