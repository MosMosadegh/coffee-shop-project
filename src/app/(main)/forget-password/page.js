import React from "react";
import styles from "@/styles/forget-password.module.css";
import Link from "next/link";
import Image from "next/image";

const ForgotPassword = () => {
  return (
    <>
      <div className={styles.forgot_password}>
        <div data-aos="fade-up" className={styles.bg}>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل / شماره موبایل"
            />
            <button style={{ marginTop: "1rem" }} className={styles.btn}>
              بازنشانی رمزعبور
            </button>
            <Link href={"/login-register"} className={styles.back_to_login}>
              برگشت به ورود
            </Link>
          </div>
          <Link href={"/login-register"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </div>
        <section>
          <Image
          width={900}
          height={500}
          className="max-w-7xl"
            src="/images/coffee-brain-caffeine-neuroscincces.webp"
            alt=""
          />
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
