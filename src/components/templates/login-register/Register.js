import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import swal from "sweetalert";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { useRouter } from "next/navigation";

const Register = ({ showLoginForm }) => {
  const router = useRouter();
  const [isRegisterWithPassword, setIsRegisterWithPassword] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const user = { name, phone, email, password };
    if (!name.trim()) {
      return showSwal("نام را وارد کنید", "error", "تلاش مجدد");
    }
    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return showSwal("شماره تماس صحیح نمیباشد", "error", "تلاش مجدد");
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return showSwal("ایمیل صحیح نمیباشد", "error", "تلاش مجدد");
    }
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal(
        "رمز میباست شامل : حداقل یک حرف کوچک, حداقل یک حرف بزرگ, حداقل یک عدد, حداقل یک نماد خاص, با حداقل 8 کاراکتر باشد.",
        "error",
        "تلاش مجدد"
      );
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.status === 201) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      swal({
        title: "ثبت نام با موفقیت انجام شد",
        icon: "success",
        buttons: "ورود به پنل کاربری",
      }).then(() => {
        router.replace("/p-user");
      });
    }
    if (res.status === 422) {
      return showSwal(
        "کاربر دیگری با این مشخصات موجود میباشد",
        "error",
        "تلاش مجدد"
      );
    }
  };
  const hideOtpForm = () => {
    setIsRegisterWithOtp(false);
  };

  const sendOtp = async () => {
    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return showSwal("شماره تماس صحیح نمیباشد", "error", "تلاش مجدد");
    }

    const res = await fetch("/api/auth/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({phone}),
    });
    if (res.status === 201) {
      swal({
        title: "کد ورود با موفقیت ارسال شد",
        icon: "success",
        buttons: "وارد کردن کد",
      }).then(() => {
        setIsRegisterWithOtp(true)
      });
     }

  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام"
            />
            <input
              className={styles.input}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل (دلخواه)"
            />
            {isRegisterWithPassword && (
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
              />
            )}
            <p
              onClick={sendOtp}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              onClick={() => {
                if (isRegisterWithPassword) {
                  signup();
                } else {
                  setIsRegisterWithPassword(true);
                }
              }}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p className={styles.back_to_login} onClick={showLoginForm}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} phone={phone} />
      )}
    </>
  );
};
export default Register;
