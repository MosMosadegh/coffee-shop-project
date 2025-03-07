"use client";
import React, { memo, useEffect, useState } from "react";
// import CardMobile from "./CardMobile";
import NavMobile from "./NavMobile";
import { FaBars } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default memo(function HeaderMobile({ user }) {
  const [isShowNavMobile, setIsShowNavMobile] = useState(false);
  const [isShowCardMobile, setIsShowCardMobile] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

   useEffect(() => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    }, [user]);
    
  return (
    <div style={{ direction: "rtl" }}>
      <div className="flex lg:hidden justify-between items-center h-16 px-4 bg-white dark:bg-zinc-700">
        {/* //* Nav Icon  */}
        <div>
          <FaBars
            className="h-8 w-8 text-zinc-700 dark:text-white "
            onClick={() => {
              setIsShowNavMobile(true);
            }}
          />
        </div>
        <NavMobile
          isShowNavMobile={isShowNavMobile}
          setIsShowNavMobile={setIsShowNavMobile}
          isUserLoggedIn={isUserLoggedIn}
          user={user}
        />
        {/* //* Logo Type  */}
        <div>
          <span className="h-10 w-[100px] text-orange-300">
            لوگو پروژه مصطفی
          </span>
        </div>
        {/* //* Card Icon  */}
        <div>
          <FaCartShopping
            className="h-8 w-8 text-zinc-700 dark:text-white"
            onClick={() => {
              setIsShowCardMobile(true);
            }}
          />
        </div>
        {/* <CardMobile
          isShowCardMobile={isShowCardMobile}
          setIsShowCardMobile={setIsShowCardMobile}
        /> */}
      </div>

      {/* //* Overlay  */}
      <div
        className={`overlay md:hidden fixed inset-0 w-full h-full bg-black/40 z-10 transition-all ${
          isShowNavMobile || isShowCardMobile
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={() => {
          setIsShowNavMobile(false);
          setIsShowCardMobile(false);
        }}
      ></div>
    </div>
  );
});
