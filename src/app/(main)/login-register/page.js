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
      <div className="container">
        <div className="w-[100%] lg:w-[95%] left-0 right-0 mx-auto  ">
          <Breadcrumb route={"ورود و عضویت"} />
          <div className={`${styles.login_register} flex justify-center `}>
            <div className={styles.form_bg}>
              {authType === authTypes.LOGIN ? (
                <Login showRegisterForm={showRegisterForm} />
              ) : (
                <Register showLoginForm={showLoginForm} />
              )}
            </div>
            <section className="hidden md:block h-full">
              <img
                className=" object-contain"
                src="https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg"
                alt=""
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default login_register;
