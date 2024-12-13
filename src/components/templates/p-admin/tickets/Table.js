"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";

import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helpers";

export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicket = (body) => {
    showSwal(body, undefined, "بستن");
  };

  const answerTicket = (ticket) => {
    swal({
      title: "لطفا پاسخ مورد نظر را وارد کنید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answerText) => {
      if (answerText) {
        const answer = {
          ...ticket,
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
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>

              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>

                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      showTicket(ticket.body);
                    }}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => answerTicket(ticket)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => banUser(ticket.user.email, ticket.user.phone)}
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
