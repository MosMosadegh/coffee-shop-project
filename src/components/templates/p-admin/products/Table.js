"use client";
import React from "react";
import styles from "./table.module.css";
import Swal from "sweetalert2";

export default function DataTable({ products, title }) {
  const showProduct = (body) => {
    Swal.fire({
      title: "  توضیحات کوتاه: ",
      text: body,
            icon: "info",
            confirmButtonText: "فهمیدم",
          });
  };

  const editProduct = async () => {
    //Code
  };

  const deleteProduct = () => {
    //Code
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
          <thead className="dark:bg-slate-600">
            <tr>
              <th>شناسه</th>
              <th> نام </th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>مشاهده جزئیات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody className="dark:bg-slate-600">
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}</td>
                <td>{product.score}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => {
                      showProduct(product.shortDescription);
                    }}
                  >
                    مشاهده جرئیات
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => {
                      editProduct(product._id);
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
                      deleteProduct(product._id);
                    }}
                  >
                    حذف
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
