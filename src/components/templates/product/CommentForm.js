"use client";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
const CommentForm = ({ productID }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(5);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);

  const setCommentScore = (score) => {
    setScore(score);
    showSwal("امتیاز شما با موفیت ثبت شد", "success", "ادامه ثبت کامنت");
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setUserName(parsedUserInfo.userName);
      setEmail(parsedUserInfo.email);
    }
  }, []);

  const submitComment = async () => {
    if (isSaveUserInfo) {
      const userInfo = {
        userName,
        email,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    const comment = {
      userName,
      body,
      email,
      score,
      productID,
    };

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (res.status === 201) {
      setUserName("");
      setEmail("");
      setBody("");
      setScore(5);
      showSwal("نظر شما با موفقیت ثبت شد", "success", "ادامه");
    } else {
      const errorData = await res.json();
      showSwal("خطا در ثبت نظر: " + errorData.message, "error", "تلاش مجدد");
    }
  };

  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => setCommentScore(5)} />
          <IoMdStar onClick={() => setCommentScore(4)} />
          <IoMdStar onClick={() => setCommentScore(3)} />
          <IoMdStar onClick={() => setCommentScore(2)} />
          <IoMdStar onClick={() => setCommentScore(1)} />
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value={isSaveUserInfo}
          onClick={(e) => setIsSaveUserInfo((prevValue) => !prevValue)}
        />
        <p>
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={submitComment}>ثبت</button>
    </div>
  );
};

export default CommentForm;
