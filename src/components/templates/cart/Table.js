"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { showSwal } from "@/utils/helpers";

const stateOptions = stateData();

const Table = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null)

  console.log("cart=>", cart);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(() => {
    calcTotalPrice();
  }, [cart]);

  const calcTotalPrice = () => {
    let price = 0;

    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
      setTotalPrice(price);
    }
    setTotalPrice(price);
  };

  const checkDiscount = async () => {
    // Validation 👈✍

    if (appliedDiscount) {
      return showSwal("کد تخفیف قبلاً اعمال شده است", "error", "تلاش مجدد");
    }

    const res = await fetch("/api/discount/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });
    console.log("res Discount=>", res);

    if (res.status === 404) {
      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      return showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      const newPrice = totalPrice-(totalPrice*discountCode.percent)/100
      setTotalPrice(newPrice)
      setAppliedDiscount(discount);
      return showSwal("کد تخفیف باموفقیت اعمال گردید", "success", "فهمیدم");
    }
  };

  return (
    <>
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item.count}</p>
                    <span>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={checkDiscount}>
              اعمال کوپن
            </button>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="کد تخفیف"
            />
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>205,000 تومان</p>
        </div>

        <p className={totalStyles.motor}>
          پیک موتوری: <strong> 30,000 </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={(option) => {
                setStateSelectedOption(option);
                setCitySelectedOption(null); // Reset city when state changes
              }}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions.map((state) => ({
                label: state.label,
                value: state.label,
              }))} // ایجاد گزینه‌ها برای استان
            />
            <Select
              value={citySelectedOption}
              onChange={setCitySelectedOption}
              isClearable={true}
              placeholder={"شهر"}
              isRtl={true}
              isSearchable={true}
              options={
                stateSelectedOption
                  ? stateOptions
                      .find(
                        (state) => state.label === stateSelectedOption.value
                      )
                      .value.map((city) => ({ label: city, value: city }))
                  : []
              } // ایجاد گزینه‌ها برای شهر
              isDisabled={!stateSelectedOption} // Disable if no state is selected
            />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
