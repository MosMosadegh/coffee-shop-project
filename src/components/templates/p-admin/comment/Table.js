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

  const editComment = (comment) => {
    swal({
      title: "ویرایش کامنت",
      content: {
        element: "textarea",
        attributes: {
          placeholder: "کامنت جدید را وارد کنید",
          value: comment.body,
        },
      },
      buttons: ["لغو", "ذخیره"],
    }).then(async (value) => {
      if (value) {
        const updateComment = {
          id: comment._id,
          body: value,
        };
        console.log('newCommentBody=>', value)
        const res = await fetch("/api/comment/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateComment),
        });

        if (res.status === 200) {
          swal({
            title: "کامنت با موفقیت ویرایش شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh(); // بارگذاری مجدد صفحه برای نمایش تغییرات
          });
        } else {
          swal({
            title: "خطا در ویرایش کامنت",
            icon: "error",
            buttons: "فهمیدم",
          });
        }
      }
    });
  };

  const deleteComment = (commentID) => {};

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
          commentID: comment._id,
        };

        const res = await fetch("/api/comment/answer", {
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
                <td className={comment.isAccept && styles.accept_btn}>
                  {index + 1}
                </td>
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
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      editComment(comment);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => {
                      deleteComment(comment._id);
                    }}
                  >
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
