"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DataTable({ users, title }) {
  const router = useRouter();

  const changeRole = async (userID) => {
    //Validation

    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      swal({
        title: "اطلاعات مورد نظر با موفقیت آپدیت شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {
    //Validation
    swal({
      title: "آیا از حذف کاربر مورد نظر اطمینان دارید",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ id: userID }),
        });
        if (res.status === 200) {
          swal({
            title: "کاربر مورد نظر با موفقیت حذف شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const banUser = async (email, phone) => {
    //Validation
    swal({
      title: "آیا از بن کاربر مورد نظر اطمینان دارید",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, phone }),
        });
        if (res.status === 200) {
          swal({
            title: "کاربر مورد نظر با موفقیت بن شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span className="dark:bg-slate-600">{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead className="dark:bg-slate-600">
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody className="dark:bg-slate-600">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <Link
                    href={`/p-admin/users/edit-user/${user._id}`}
                    className={styles.edit_btn}
                  >
                    ویرایش
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => banUser(user.email, user.phone)}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
