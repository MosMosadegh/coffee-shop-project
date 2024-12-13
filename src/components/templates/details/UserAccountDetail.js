"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import swal from "sweetalert";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import Joi from "joi";
import { useRouter } from "next/navigation";


function UserAccountDetails({params}) {
    const {id} = params
    const router = useRouter()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/user/edit/${id}`);
      const data = await res.json();
console.log("DATA=>>", data)
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
    };
    getUser();
  }, [id]);

//   // Define the validation schema
//   const userSchema = Joi.object({
//     name: Joi.string().min(3).max(30).required(),
//     phone: Joi.string()
//       .pattern(/^[0-9]+$/)
//       .min(10)
//       .max(15)
//       .required(),
//       email: Joi.string().email({
//         minDomainSegments: 2,
//         tlds: { allow: ["com", "net"] },
//       }).required(),
//   });

  const updateUser = async () => {
    const userNewInfos = {
      name,
      email,
      phone,
    };

    // // Validate user input
    // const { error } = userSchema.validate(userNewInfos);
    // if (error) {
    //   swal({
    //     title: "خطا",
    //     text: error.details[0].message,
    //     icon: "error",
    //     buttons: "فهمیدم",
    //   });
    //   return; // Exit the function if validation fails
    // }

    const res = await fetch(`/api/user/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userNewInfos),
    });

    if (res.status === 200) {
      swal({
        title: "اطلاعات مورد نظر با موفقیت آپدیت شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(async () => {
router.push('/p-admin/users')
      });
    }
  };

  return (
    <main>
      <div className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div>
              <label>نام کاربری</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>ایمیل</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
              />
            </div>
            <div>
              <label>شماره تماس</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
              />
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <img src="/images/shahin.jpg" alt="" />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input type="file" name="" id="" />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور</label>
              <div className={styles.password_group}>
                <input type="password" />
                <button>تغییر رمز عبور</button>
              </div>
            </div>
          </section>
        </div>
        <button
          type="submit"
          onClick={updateUser}
          className={styles.submit_btn}
        >
          ثبت تغییرات
        </button>
      </div>
    </main>
  );
}

export default UserAccountDetails;
