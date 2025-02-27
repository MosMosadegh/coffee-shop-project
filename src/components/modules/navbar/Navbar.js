"use client";
import React, { useEffect, useState } from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import ThemeToggle from "../theme/ThemeToggle";

function Navbar({ user }) {
  const [fixTop, setFixTop] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItem(localCart);
  }, []);

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => fetch("/api/wishlist/get").then((res) => res.json()),
    enabled: !!user,
  });


  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 105) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };
    window.addEventListener("scroll", fixNavbarToTop);
    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <nav className={fixTop ? styles.navbar_fixed : styles.navbar}>
        <main>
          <div>
            <Link href="/home">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          <ul className={styles.links}>
            <li>
              <Link href="/home">صفحه اصلی</Link>
            </li>
            <li>
              <Link href="/category">فروشگاه</Link>
            </li>
            <li>
              <Link href="/blog">وبلاگ</Link>
            </li>
            <li>
              <Link href="/contact-us">تماس با ما</Link>
            </li>
            <li>
              <Link href="/about-us">درباره ما</Link>
            </li>
            <li>
              <Link href="/rules">قوانین</Link>
            </li>
            <li>
              <Link href="/">3D</Link>
            </li>
            <li>
              <ThemeToggle/>
            </li>
            {!isUserLoggedIn ? (
              <li>
                <Link href="/login-register">ورود / عضویت</Link>
              </li>
            ) : (
              <>
                {/* Start My-account section */}
                <div className={styles.dropdown}>
                  <Link href="/p-user">
                    <IoIosArrowDown className={styles.dropdown_icons} />
                    {user?.name} - حساب کاربری
                    {/* حساب کاربری  */}
                  </Link>
                  <div className={styles.dropdown_content}>
                    <Link href="/p-user/orders">سفارشات</Link>
                    <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                    <Link href="/p-user/comments">کامنت‌ها</Link>
                    <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                    <Link href="/p-user/account-details">جزئیات اکانت</Link>
                  </div>
                </div>

                {/* Finish My-account section */}
              </>
            )}
          </ul>

          <div className={styles.navbar_icons}>
            <Link href="/cart">
              <FaShoppingCart />
              <span>{cartItem?.length || 0}</span>
            </Link>
       
       
            <Link href={user? "/p-user/wishlist" : "/home" }>
              <FaRegHeart />
              <span>{wishlist?.length || 0}</span>
            </Link>
          </div>
        </main>
      </nav>
    </div>
  );
}

export default Navbar;
