"use client";
import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import Article from "./Article";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className={`${styles.footer} hidden text-sm md:block  md:text-base `}>
      <main className=" text-white">
        <section className={styles.descriptions}>
          <img src="/images/logo_light.png" alt="" />
          <p className={styles.descriptions_title}>
            شرکت و   فروشگاه اینترنتی  مصطفی ✅ ❌ 
          </p>

          <div className={styles.description}>
            <FaRegHeart style={{ fontSize: "2rem" }} />
            <p>
              تهران. شریف آباد . شهرک صنعتی خوارزمی فاز 2 . بلوار بهارستان.
              خیابان ماگنولیا بلوک آ117
            </p>
          </div>
          <div className={styles.description}>
            <FaRegHeart />
            <p>پیگیری سفارشات : 09127595049</p>
          </div>
          <div className={styles.description}>
            <FaRegHeart />
            <p>support [at] Mostafa-Mosadegh.com</p>
          </div>
        </section>

        <section>
          <h4>جدیدترین نوشته ها</h4>
          <Article
            href={"/article/123"}
            data="۱۷ آبان ۱۴۰۲ "
            comments="بدون دیدگاه"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="افزایش انرژی با پودر قهوه فوری"
          />

          <hr />

          <Article
            href={"/article/123"}
            data="۱۷ آبان ۱۴۰۲ "
            comments="بدون دیدگاه"
            img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
            title="افزایش انرژی با پودر قهوه فوری"
          />
        </section>

        <ul className={styles.links}>
          <div>
            <h4>منوی فوتر</h4>
            <li>
              <Link href={"/contact-us"}>تماس با ما</Link>
            </li>
            <li>
              <Link href={"/about-us"}>درباره ما </Link>
            </li>
            <li>
              <Link href={"/rules"}>قوانین</Link>
            </li>
          </div>
          <div>
            <h4>دسترسی سریع</h4>
            <li>
              <Link href={"/category"}> فروشگاه </Link>
            </li>
            <li>
              <Link href={"/articles"}> مقالات </Link>
            </li>
            <li>
              <Link href={"/cart"}>سبد خرید</Link>
            </li>
            <li>
              <Link href={"/wishlist"}>علاقه مندی ها</Link>
            </li>
          </div>
        </ul>
        <div className={styles.licenses}>
          <img src="/images/license4.htm" width={76} height={76} alt="" />
          <img src="/images/license1.png" width={85} height={85} alt="" />
          <img src="/images/license3.png" width={85} height={85} alt="" />
          <img src="/images/license2.svg" width={85} height={85} alt="" />
        </div>
      </main>
      <hr />
      <div className=" h-8 flex justify-end items-center  text-white h-13">
        <p className={styles.copyRight}>
          2023
          <MdOutlineCopyright /> تمام حقوق متعلق است به <strong>Mostafa Mosadegh</strong>
          | طراحی و اجرا <strong>Mostafa</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
