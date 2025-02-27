"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";
import Image from "next/image";
import AddressSelector from "@/components/modules/addressSelector/AddressSelector";

const Table = ({ cart, removeFromCart, increaseCount, decreaseCount }) => {
  const [discount, setDiscount] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [changeAddress, setChangeAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState({
    state: null,
    city: null,
    postalCode: "",
  });

  //console.log("cart=>", cart);


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
      setSubtotal(price);
    } else {
      setSubtotal(0);
    }
  };

  useEffect(() => {
    const newTotalPrice = subtotal - (subtotal * discountPercent) / 100;
    setTotalPrice(newTotalPrice);
  }, [subtotal, discountPercent]);

  const checkDiscount = async () => {
    // Validation 👈✍

    if (discountPercent > 0) {
      return showSwal("کد تخفیف قبلاً اعمال شده است", "error", "تلاش مجدد");
    }

    const res = await fetch("/api/discount/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });
    //console.log("res Discount=>", res);

    if (res.status === 404) {
      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      return showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      setDiscountPercent(discountCode.percent);

      return showSwal("کد تخفیف باموفقیت اعمال گردید", "success", "فهمیدم");
    }
  };

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setChangeAddress(false); // بستن بخش تغییر آدرس
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
                    <span onClick={() => decreaseCount(item.id)}>-</span>
                    <p>{item.count}</p>
                    <span onClick={() => increaseCount(item.id)}>+</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <Image height={300} width={300} src={item.img} alt="" />
                  <Link href={"/home"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose
                    className={styles.delete_icon}
                    onClick={() => removeFromCart(item.id)}
                  />
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
          <p>{subtotal.toLocaleString()} تومان</p>
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
          {selectedAddress.state && selectedAddress.city ? (
            <>
              {selectedAddress.state} - {selectedAddress.city}
            </>
          ) : (
            "لطفاً آدرس را انتخاب کنید"
          )}
        </p>
        {changeAddress && (
          <AddressSelector onAddressChange={handleAddressChange} />
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
