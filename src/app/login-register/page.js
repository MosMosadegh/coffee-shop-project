"use client";
import styles from "@/styles/login-register.module.css";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import { useState } from "react";
import { authTypes } from "@/utils/constants";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";

const login_register = () => {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => {
    setAuthType(authTypes.REGISTER);
  };
  const showLoginForm = () => {
    setAuthType(authTypes.LOGIN);
  };

  return (
    <>
    <Breadcrumb route={"ورود و عضویت"} />
     <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showLoginForm={showLoginForm} />
        )}
      </div>
      <section>
        <img
          className="max-w-7xl"
          src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
          alt=""
        />
      </section>
    </div>
    </>
   
  );
};

export default login_register;
