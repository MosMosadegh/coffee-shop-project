import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import { authUser } from "@/utils/isLogin";
import { redirect } from "next/navigation";

const Layout = async ({ children }) => {
  const user = await authUser();
  
  if (user) {
    if (!user.role === "ADMIN") {
     return redirect("/login-register");
    }
  }else {
    redirect("/login-register");
  }

  return (
    <>
      <Breadcrumb route={"پنل مدیریت"} />
      <div className={styles.layout}>
        <section className={styles.section}>
          <Sidebar />
          <div className={styles.contents}>
            <Topbar />
            {children}
          </div>
        </section>
      </div>
    </>
  );
};

export default Layout;
