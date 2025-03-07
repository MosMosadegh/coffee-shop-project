import Link from "next/link";
import styles from "./promote.module.css";

const Promote = () => {
  return (
    <div className={`${styles.readable} dark:bg-slate-600`}>
      <div data-aos="fade-up-right" data-aos-duration="1500" className="">
        <main className={styles.main}>
          <section>
           <span>خرید قهوه ، به سبک حرفه ای ها</span>
            <p className=" text-gray-500 dark:text-white">
              زیبایی امروز رو با قهوه “ست” کنید
            </p>
            <img data-aos="fade-left" src="/images/coffee-image-1.jpg" alt="" />
          </section>
          <section className={styles.club}>
            <div className="">
              <span>باشگاه مشتریان ست</span>
              <p>برای مشتریان وفادار قهوه ست</p>
            </div>
          </section>
        </main>
        <main className={styles.main}>
          <img className="w-full" width={660} height={530} src="/images/Home32.jpg" alt="" />
          <section
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className= {styles.why_coffee}
          >
            <img
              className={styles.logo}
              src="/images/coffee-svg-2.svg"
              alt=""
            />
            <p className={styles.title}>چرا قهوه ست</p>
            <p className=" text-gray-500 dark:text-white" >
              برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان
              راهنمای ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است
              .تجربه ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان قهوه
              ضامن این ویژگیها است.
            </p>
            <div className="">
              <Link href="/about-us">
                <button className={styles.red_btn}>بیشتر بخوانید</button>
              </Link>
              <Link href="/category">
                <button>فروشگاه</button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Promote;
