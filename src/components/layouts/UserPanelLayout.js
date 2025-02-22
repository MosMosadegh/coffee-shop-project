import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { authUser } from "@/utils/isLogin";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import NavbarWithUser from "../modules/navbar/NavbarWithUser";
import Footer from "../modules/footer/Footer";

const Layout = async ({ children }) => {
  const user = await authUser();
  if (!user) {
    //console.log("User not authenticated");
  } else {
    //console.log("Authenticated user:", user);
  }

  return (
    <>
      <NavbarWithUser />
      <Breadcrumb route={"پنل کاربری"} />
      <div className={`${styles.layout}  dark:bg-slate-500`}>
        <section className={styles.section}>
          <Sidebar user={user.name} />
          <div className={styles.contents}>
            <Topbar userName={user.name} role={user.role} />
            {children}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
