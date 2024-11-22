"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword } from "@/utils/auth";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [phoneOrEmail, SetPhoneOrEmail] = useState("");
  const [password, SetPassword] = useState("");

  const hideOtpForm = () => {
    setIsLoginWithOtp(false);
  };

  const loginWithPassword = async () => {
    if (!phoneOrEmail) {
      return showSwal(
        "لطفا شماره تماس یا ایمیل را وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
    const isValidEmail = validateEmail(phoneOrEmail);
    if (!isValidEmail) {
      return showSwal("ایمیل صحیح نمیباشد", "error", "تلاش مجدد");
    }
    if (!password) {
      return showSwal("لطفا پسورد را وارد کنید", "error", "تلاش مجدد");
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal(" رمز دارای شرایط لازم نمیباشد", "error", "تلاش مجدد");
    }
    const user = { email: phoneOrEmail, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      SetPhoneOrEmail("");
      SetPassword("");
      showSwal(
        "شما با موفقیت وارد حساب خود شدید",
        "success",
        "ورود به پنل کاربری"
      );
    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعت یافت نشد", "error", "تلاش مجدد");
    } else if (res.status === 419) {
      showSwal("ایمیل یا رمزورود صحیح نمی باشد", "error", "تلاش مجدد");
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={phoneOrEmail}
              onChange={(e) => SetPhoneOrEmail(e.target.value)}
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" defaultChecked={true} name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button onClick={loginWithPassword} className={styles.btn}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              className={styles.btn}
              onClick={(e) => setIsLoginWithOtp(true)}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button className={styles.btn_light} onClick={showRegisterForm}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
