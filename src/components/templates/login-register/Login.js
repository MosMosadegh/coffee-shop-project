"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {
  const router = useRouter();

  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => {
    setIsLoginWithOtp(false);
  };

  const loginWithPassword = async () => {
    if (!phone.trim() && !email.trim()) {
      return showSwal(
        "لطفا شماره تماس یا ایمیل را وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }
    if (email && !validateEmail(email)) {
      return showSwal("ایمیل صحیح نمیباشد", "error", "تلاش مجدد");
    }
    if (phone && !validatePhone(phone)) {
      return showSwal("شماره تماس صحیح نمیباشد", "error", "تلاش مجدد");
    }

    if (!password) {
      return showSwal("لطفا پسورد را وارد کنید", "error", "تلاش مجدد");
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal(" رمز دارای شرایط لازم نمیباشد", "error", "تلاش مجدد");
    }
    const user = {
      email: email ? email : undefined,
      phone: phone ? phone : undefined,
      password,
    };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 200) {
      setEmail("");
      setPhone("");
      setPassword("");
      swal({
        title: "شما با موفقیت وارد حساب خود شدید",
        icon: "success",
        buttons: "ورود به پنل کاربری",
      }).then(() => {
        router.replace("p-user");
      });
    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعت یافت نشد", "error", "تلاش مجدد");
    } else if (res.status === 419) {
      showSwal("ایمیل یا رمزورود صحیح نمی باشد", "error", "تلاش مجدد");
    }else if (res.status === 403) {
      showSwal("شما با کد یکبار مصرف ثبت نام کردید. لطفا از گزینه ورود با کد یکبار مصرف استفاده کنید", "error", "تلاش مجدد");
    }
  };

  const sendOtp = async () => {
    if (phone) {
      const isValidPhone = validatePhone(phone);
      if (!isValidPhone) {
        return showSwal("شماره تماس صحیح نمیباشد", "error", "تلاش مجدد");
      }

      const newUser = {
        phone,
        action: "login",
      };

      const res = await fetch("/api/auth/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (res.status === 201) {
        swal({
          title: "کد ورود با موفقیت ارسال شد",
          icon: "success",
          buttons: "وارد کردن کد",
        }).then(() => {
          setIsLoginWithOtp(true);
        });
      } else if (res.status === 404) {
        swal({
          title: "با این شماره تماس قبلا ثبت نام نشده",
          icon: "error",
          buttons: "ثبت نام می‌کنم",
        }).then(() => {
          showRegisterForm();
        });
      }
    } else {
      return showSwal("لطفا شماره تماس را وارد نمائید", "error", "تلاش مجدد");
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل"
            />
            <input
              className={styles.input}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره موبایل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button className={styles.btn} onClick={sendOtp}>
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
        <Sms hideOtpForm={hideOtpForm} phone={phone} />
      )}
    </>
  );
};

export default Login;
