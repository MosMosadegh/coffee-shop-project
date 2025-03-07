"use client";
import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "../theme/ThemeToggle";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import {
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
  FaHome,
} from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { MdOutline3dRotation, MdPhoneCallback } from "react-icons/md";
import { TbRulerMeasure2 } from "react-icons/tb";
import { BsBoxArrowInRight } from "react-icons/bs";

export default function NavMobile({ isShowNavMobile, setIsShowNavMobile,isUserLoggedIn, user}) {
  const [isShowSubmenu, setIsShowSubmenu] = useState(false);
  const toggleHandler = () => {
    setIsShowSubmenu((prevIsShowSubmenu) => !prevIsShowSubmenu);
  };

  return (
    <div
      className={`fixed top-0 bottom-0 w-64 overflow-y-auto py-3 px-4 bg-white dark:bg-zinc-700 z-20 transition-all ${
        isShowNavMobile ? "right-0" : "-right-64"
      }`}
    >
      {/* //* NAV Header */}
      <div className="flex justify-between items-center pb-4 pt-2 mb-6 border-b border-b-gray-100 dark:border-b-white/10 ">
        <div className="flex  text-white mr-5 ">
         <span>Mostafa</span>
        </div>
        <FaXmark
          className="h-5 w-5 text-zinc-600 dark:text-white"
          onClick={() => {
            setIsShowNavMobile(false);
          }}
        />
      </div>

      {/* //* NAVBAR */}
      <div>
        <ul className="sidBar-link flex flex-col space-y-6 child:px-2.5 text-zinc-600 dark:text-white">
          <Link href="/home" className="inline-flex items-center gap-x-2">
            <FaHome className="h-5 w-5" />
            صفحه اصلی
          </Link>
          <div>
            <Link href="/category" className="flex items-center">
              <div
                className="flex items-center pl-3 justify-between w-full"
                onClick={toggleHandler}
              >
                <div className="flex items-center gap-x-2">
                  <FaCartShopping className="h-5 w-5" />
                  فروشگاه
                </div>
                <div>
                  {isShowSubmenu ? (
                    <FaChevronDown className="h-4 w-4" />
                  ) : (
                    <FaChevronUp className="h-4 w-4" />
                  )}
                </div>
              </div>
            </Link>
          </div>
          <div>
            {isShowSubmenu && (
              <div className="submenu">
                <a href="#">قهوه ویژه</a>
                <a href="#">ویژه در سطح جهانی</a>
                <a href="#">قهوه درجه یک</a>
                <a href="#">ترکیبات تجاری</a>
                <a href="#">کپسول قهوه</a>
                <a href="#">قهوه زینو برزیلی</a>
              </div>
            )}
          </div>
          <Link href="/blog" className="inline-flex items-center gap-x-2">
            <IoDocumentText className="h-5 w-5" />
            بلاگ
          </Link>

          <Link href="/contact-us" className="inline-flex items-center gap-x-2">
            <MdPhoneCallback className="h-5 w-5" />
            تماس با ما
          </Link>

          <Link href="/about-us" className="inline-flex items-center gap-x-2">
            <FaBriefcase className="h-5 w-5" />
            درباره ما
          </Link>

          <Link href="/rules" className="inline-flex items-center gap-x-2">
            <TbRulerMeasure2 className="h-5 w-5" />
            قوانین
          </Link>
          <Link href="/" className="inline-flex items-center gap-x-2">
            <MdOutline3dRotation className="h-5 w-5" />
            3D
          </Link>
        </ul>
      </div>

      {/* //*NAV Footer  */}
      <div className="flex flex-col items-start space-y-6 py-8 px-2.5 mt-8 border-t border-t-gray-100 dark:border-t-white/10 text-orange-300">
        {/* //* Login Link  */}
        {!isUserLoggedIn ? (
          <Link
          href="/login-register"
          className="inline-flex items-center gap-x-2"
        >
          <BsBoxArrowInRight className="h-5 w-5 " />

          <span className="">ورود | ثبت‌ نام</span>
        </Link>
        ):(
          <div>
<Link href="/p-user">
          {user?.name} - حساب کاربری
</Link>
         
          </div>
        )
      }

        {/* //* Theme Toggle  */}
        <div>
          <ThemeToggle />
        </div>
        {/* //* Card Box   */}
        <Link href="/cart" className="inline-flex items-center gap-x-2 ">
          <FaCartShopping className="h-5 w-5" />
          سبد خرید
        </Link>
      </div>
    </div>
  );
}
