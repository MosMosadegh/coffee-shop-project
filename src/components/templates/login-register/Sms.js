"use client";
import { useState } from "react";
import styles from "./sms.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import { getSession, signIn } from "next-auth/react";
import { setCookie } from "cookies-next";

const Sms = ({ hideOtpForm, phone, name }) => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const signinWithVerifyCode = async (event) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      phone,
      action: "login",
      code,
      name: name ? name : "کاربر کافه ما",
      redirect: false,
    });

    // if (res.status === 409) {
    //   return showSwal("کد ورود صحیح نمیباشد", "error", "تلاش مجدد");
    // } else if (res.status === 403) {
    //   return swal({
    //     title:
    //       "تعداد تلاشهای شما به بیش از حد مجاز رسید حساب شما تا 15 دقیقه مسدود شد",
    //     icon: "error",
    //     buttons: " متوجه شدم ",
    //   });
    // } else if (res.status === 410) {
    //   return swal({
    //     title: "کد ورود منقضی شده",
    //     icon: "error",
    //     buttons: "تلاش مجدد",
    //   }).then(() => {
    //     router.replace("login-register");
    //   });
    // }
     if (res.ok) {
      const session = await getSession();

      if (session) {
        setCookie("accessToken", session.accessToken, {
          maxAge: 15 * 60, // 15 دقیقه
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // ذخیره refreshToken در کوکی
        setCookie("refreshToken", session.refreshToken, {
          maxAge: 7 * 24 * 60 * 60, // 7 روز
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        return swal({
          title: "کد ورود با موفقیت شناسایی شد",
          icon: "success",
          buttons: "  ورود به پنل کاربری",
        }).then(() => {
          router.replace("p-user");
        });
      }
    }
  };
  return (
    <>
      <div className={styles.form}>
        <form>
          <p>کد تایید</p>
          <span className={styles.code_title}>
            لطفاً کد تأیید ارسال شده را تایپ کنید
          </span>
          <span className={styles.number}>{phone}</span>
          <input
            className={styles.input}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            style={{ marginTop: "1rem" }}
            className={styles.btn}
            onClick={signinWithVerifyCode}
          >
            ثبت کد تایید
          </button>
        </form>
        <p className={styles.send_again_code}>ارسال مجدد کد یکبار مصرف</p>
      </div>
      <p onClick={hideOtpForm} className={styles.redirect_to_home}>
        لغو
      </p>
    </>
  );
};

export default Sms;
