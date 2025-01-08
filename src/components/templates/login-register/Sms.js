"use client";
import { useState } from "react";
import styles from "./sms.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";

const Sms = ({ hideOtpForm, phone, name }) => {
  const router = useRouter();
  const [code, setCode] = useState("");

  const verifyCode = async () => {
    //Validation todo
    const body = {
      phone,
      code,
      name: name ? name : undefined,
    };
    const res = await fetch("/api/auth/sms/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 409) {
      return showSwal("کد ورود صحیح نمیباشد", "error", "تلاش مجدد");
    } else if (res.status === 403) {
      return swal({
        title:
          "تعداد تلاشهای شما به بیش از حد مجاز رسید حساب شما تا 15 دقیقه مسدود شد",
        icon: "error",
        buttons: " متوجه شدم ",
      });
    } else if (res.status === 410) {
      return swal({
        title: "کد ورود منقضی شده",
        icon: "error",
        buttons: "تلاش مجدد",
      }).then(() => {
        router.replace("login-register");
      });
    } else if (res.status === 200) {
      return swal({
        title: "کد ورود با موفقیت شتاسایی شد",
        icon: "success",
        buttons: "  ورود به پنل کاربری",
      }).then(() => {
        router.replace("p-user");
      });
    }
  };
  return (
    <>
      <div className={styles.form}>
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
          style={{ marginTop: "1rem" }}
          className={styles.btn}
          onClick={verifyCode}
        >
          ثبت کد تایید
        </button>
        <p className={styles.send_again_code}>ارسال مجدد کد یکبار مصرف</p>
      </div>
      <p onClick={hideOtpForm} className={styles.redirect_to_home}>
        لغو
      </p>
    </>
  );
};

export default Sms;
