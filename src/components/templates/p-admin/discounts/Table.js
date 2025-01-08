"use client";
import React from "react";
import styles from "./table.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Table({ discounts }) {
  const router = useRouter();
  const deleteDiscount = (discountID) => {
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
        const res = await fetch("/api/discount/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ id: discountID }),
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
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>شناسه</th>
          <th>کد</th>
          <th>درصد</th>
          <th>حداکثر استفاده</th>
          <th>دفعات استفاده شده</th>
          <th>محصول</th>
          <th>سازنده</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map((discount, index) => (
          <tr key={discount._id} className="border">
            <td className={discount.uses < discount.maxUse ? "bg-green-600" : "bg-red-500"}>{index + 1}</td>
            <td>{discount.code}</td>
            <td>{discount.percent}</td>
            <td>{discount.maxUse}</td>
            <td>{discount.uses}</td>
            <td>{discount.product?.name}</td>
            <td>{discount.user.name}</td>
            <td>
              <button
                type="button"
                className={styles.delete_btn}
                onClick={() => deleteDiscount(discount._id)}
              >
                حذف
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
