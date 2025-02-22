"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import { useRouter } from "next/navigation";

function AddDiscount() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState(-1);
  const [isGlobal, setIsGlobal] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch("/api/product/get");
      const data = await res.json();
      //console.log('Data=>', data)
      setProducts(data);
    };
    getProduct();
  }, []);


  const submitHandler = async () => {

    if (!code || !percent || !maxUse) {
      swal({
        title: "لطفا همه فیلدها را پر کنید.",
        icon: "error",
        buttons: "فهمیدم",
      });
      return; 
    }

    if (products.length === 0) {
      swal({
        title: "هیچ محصولی برای انتخاب وجود ندارد.",
        icon: "error",
        buttons: "فهمیدم",
      });
      return;
    }

    
    if (productID === -1) {
      swal({
        title: "لطفا محصول را انتخاب کنید.",
        icon: "error",
        buttons: "فهمیدم",
      });
      return; 
    }

    const discount = {
      code,
      percent,
      maxUse,
      product: productID === "All" ? undefined : productID,
      isGlobal
    };
   
    //validation with Zod 👈✍

    const res = await fetch("/api/discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discount),
    });

    if (res.status === 201) {
      swal({
        title: "اطلاعات مورد نظر با موفقیت ثبت شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        setCode("");
        setPercent("");
        setMaxUse("");
        setProductID(-1);
        setIsGlobal(false)
        router.refresh();
      });
    }
  };

  return (
    <section className={styles.discount}>
      <p>افزودن کد تخفیف جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>شناسه تخفیف</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="لطفا شناسه تخفیف را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>درصد تخفیف</label>
          <input
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="لطفا درصد تخفیف را وارد کنید"
            type="text"
          />
        </div>
        <div>
          <label>حداکثر استفاده</label>
          <input
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
            placeholder="حداکثر استفاده از کد تخفیف"
            type="text"
          />
        </div>
        <div>
          <label>محصول</label>
          <select
          value={productID}
            onChange={(e) => {
              setProductID(e.target.value);
              if (e.target.value === "All"){
                setIsGlobal(true)
              }else{setIsGlobal(false)}
            }}
            name=""
            id=""
          >
            <option value={-1}>لطفا محصول را انتخاب کنید </option>
            <option value={"All"}>کل محصولات</option>
            {products.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={submitHandler}>افزودن</button>
    </section>
  );
}

export default AddDiscount;
