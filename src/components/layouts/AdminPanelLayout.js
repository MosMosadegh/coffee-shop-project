import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import { authAdmin } from "@/utils/isLogin";
import { redirect } from "next/navigation";
import NavbarWithUser from "../modules/navbar/NavbarWithUser";
import Footer from "../modules/footer/Footer";

const Layout = async ({ children }) => {
  const admin = await authAdmin();
  if (!admin) {
    //console.log("User is not an admin");
    return redirect("/login-register");
  } else {
    //console.log("Authenticated admin:", admin);
  }

  return (
    <>
      <NavbarWithUser />
      <Breadcrumb route={"پنل مدیریت"} />
      <div className={`${styles.layout}  dark:bg-slate-500`}>
        <section className={styles.section}>
          <Sidebar />
          <div className={styles.contents}>
            <Topbar adminName={admin.name} />
            {children}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
