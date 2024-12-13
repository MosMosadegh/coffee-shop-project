"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";

import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";

export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showComment = (body) => {
    showSwal(body, undefined, "بستن");
  };

  const acceptComment = async (commentID) => {
    const res = await fetch("/api/comment/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });
    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر تایید شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const rejectComment = async (commentID) => {
    const res = await fetch("/api/comment/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });
    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر رد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const answerComment = (comment) => {
    swal({
      title: "لطفا پاسخ مورد نظر را وارد کنید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answerText) => {
      if (answerText) {
        const answer = {
          ...comment,
          body: answerText,
          ticketID: ticket._id,
        };
        console.log("ANSWERTICKET=>>", answer);
        const res = await fetch("/api/ticket/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        });
        if (res.status === 201) {
          swal({
            title: "پاسخ مورد نظر ثبت شد",
            icon: "success",
            buttons: "فهمیدم",
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
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th> کاربر </th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید/ رد</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td className={comment.isAccept && styles.accept_btn}>{index + 1}</td>
                <td>{comment.userName}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.productID.name}</td>
                <td>
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </td>

                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      showComment(comment.body);
                    }}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button
                      type="button"
                      className={styles.accept_btn}
                      onClick={() => {
                        rejectComment(comment._id);
                      }}
                    >
                      تایید شده
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => {
                        acceptComment(comment._id);
                      }}
                    >
                      منتظر تایید
                    </button>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => {
                      answerComment(comment);
                    }}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() =>
                      banUser(comment.user.email, comment.user.phone)
                    }
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
