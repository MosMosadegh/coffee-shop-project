"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { showSwal } from "@/utils/helpers";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [body, setBody] = useState("");

  const contactSubmit = async (event) => {
    event.preventDefault();
    const contact = { userName, email, phone, company, body };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    if (res.status === 201) {
      setUserName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setBody("");
      showSwal(" پیام شما با موفقیت ثبت شد", "success", "متوجه شدم");
    }

  };

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          name=""
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <button onClick={contactSubmit}>ارسال</button>
    </form>
  );
};

export default Form;
