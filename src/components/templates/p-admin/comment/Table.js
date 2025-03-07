"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";

import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";

export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showComment = (body) => {
    showSwal(body, undefined, "بستن");
  };

  const editComment = async (commentID, commentBody) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "ویرایش کامنت",
      inputPlaceholder: "کامنت جدید را وارد کنید",
      inputValue: commentBody,
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
      const updateComment = {
        id: commentID,
        body: text,
      };
      const res = await fetch("/api/comment/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateComment),
      });

      if (res.status === 200) {
        Swal.fire({
          title: "کامنت با موفقیت ویرایش شد",
          icon: "success",
          buttons: "فهمیدم",
        });
        router.refresh();
      } else {
        Swal.fire({
          title: "خطا در ویرایش کامنت",
          icon: "error",
          buttons: "فهمیدم",
        });
      }
    }
  };

  const deleteComment = (commentID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/comment/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ id: commentID }),
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        router.refresh();
      }
    });
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

  const answerComment = async (commentID) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "پاسخ به کامنت",
      inputPlaceholder: "پاسخ جدید را وارد کنید",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
      const answerComment = {
        id: commentID,
        body: text,
      };
      const res = await fetch("/api/comment/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerComment),
      });

      if (res.status === 200) {
        Swal.fire({
          title: "کامنت با موفقیت پاسخ داده شد",
          icon: "success",
          buttons: "فهمیدم",
        });
        router.refresh();
      } else {
        Swal.fire({
          title: "خطا در پاسخ به کامنت",
          icon: "error",
          buttons: "فهمیدم",
        });
      }
    }
  };
  const showAnswersComment = (comment) => {
    if (!comment.answers || comment.answers.length === 0) {
      Swal.fire({
        title: "پاسخ‌ها",
        text: "هیچ پاسخی برای این کامنت وجود ندارد.",
        icon: "info",
        confirmButtonText: "فهمیدم",
      });
      return;
    }

    const answersHtml = comment.answers
      .map(
        (answer) => `
      <div>
        <p><strong>پاسخ:</strong> ${answer.body}</p>
        <p><small>تاریخ: ${new Date(answer.createdAt).toLocaleDateString(
          "fa-IR"
        )}</small></p>
      </div>
    `
      )
      .join("");

    Swal.fire({
      title: "پاسخ‌ها",
      html: answersHtml,
      icon: "info",
      confirmButtonText: "فهمیدم",
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
          <tbody className="dark:bg-slate-600">
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td className={comment.isAccept ? styles.accept_btn : ""}>
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
                      editComment(comment._id, comment.body);
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
                  {comment.answers && comment.answers.length > 0 ? (
                    <button
                      type="button"
                      className={styles.accept_btn}
                      onClick={() => {
                        showAnswersComment(comment);
                      }}
                    >
                      نمایش پاسخ
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => {
                        answerComment(comment._id);
                      }}
                    >
                      پاسخ
                    </button>
                  )}
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
