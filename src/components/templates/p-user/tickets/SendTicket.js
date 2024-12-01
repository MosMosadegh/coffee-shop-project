"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import validateTicket from "@/validations/tickets";

function SendTicket() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departments, setDepartments] = useState([]);
  const [departmentsID, setDepartmentsID] = useState(-1);
  const [subDepartments, setSubDepartments] = useState([]);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);
  const [priority, setPriority] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments(data);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      const res = await fetch(`/api/departments/sub/${departmentsID}`);
      if (res.status === 200) {
        const data = await res.json();
        setSubDepartments(data);
      }
    };
    if (departmentsID) {
      getSubDepartments();
    }
  }, [departmentsID]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const ticket = {
      title,
      body,
      department: String(departmentsID),
      subDepartment: String(subDepartmentID),
      priority: Number(priority),
    };

    //validation with Zod
    const result = validateTicket(ticket);
    if (!result.success) {
      const errorMessages = {};

      result.error.errors.forEach((error) => {
        switch (error.path[0]) {
          case "title":
            errorMessages.title = "عنوان تیکت باید بین ۳ تا ۳۰ کاراکتر باشد.";
            break;
          case "body":
            errorMessages.body = "محتوای تیکت نمی‌تواند خالی باشد.";
            break;
          case "department":
            errorMessages.department = "لطفا یک دپارتمان معتبر انتخاب کنید.";
            break;
          case "subDepartment":
            errorMessages.subDepartment = "لطفا یک نوع تیکت معتبر انتخاب کنید.";
            break;
          case "priority":
            errorMessages.priority = "لطفا سطح اولویت را انتخاب کنید.";
            break;
          default:
            errorMessages[error.path[0]] =
              "خطای نامشخص. لطفا دوباره تلاش کنید.";
        }
      });

      setErrors(errorMessages);
      return;
    }

    setErrors({});

    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      swal({
        title: "اطلاعات مورد نظر با موفقیت ثبت شد",
        icon: "success",
        buttons: "مشاهده تیکتها",
      }).then(() => {
        location.replace("/p-user/tickets");
      });
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select onChange={(e) => setDepartmentsID(e.target.value)}>
            <option value={-1}>لطفا دپارتمان را انتخاب نمایید.</option>
            {departments.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
          {/* Show Error Message  */}
          {errors.department && (
            <span className={styles.error}>{errors.department}</span>
          )}
        </div>
        <div className={styles.group}>
          <label>نوع تیکت را انتخاب کنید:</label>
          <select onChange={(e) => setSubDepartmentID(e.target.value)}>
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>

            {subDepartments.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
          {/* Show Error Message  */}
          {errors.subDepartment && (
            <span className={styles.error}>{errors.subDepartment}</span>
          )}
        </div>
        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input
            placeholder="عنوان..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Show Error Message  */}
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select onChange={(e) => setPriority(e.target.value)}>
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            <option value={1}>کم</option>
            <option value={2}>متوسط</option>
            <option value={3}>بالا</option>
          </select>
          {/* Show Error Message  */}
          {errors.priority && (
            <span className={styles.error}>{errors.priority}</span>
          )}
        </div>
      </div>
      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <textarea
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {/* Show Error Message  */}
        {errors.body && <span className={styles.error}>{errors.body}</span>}
      </div>
      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn} onClick={submitHandler}>
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
}

export default SendTicket;
