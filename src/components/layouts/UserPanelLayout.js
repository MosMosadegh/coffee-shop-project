import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { authUser } from "@/utils/isLogin";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";

const Layout = async ({ children }) => {
  const user = await authUser();
if (!user) {
  console.log("User not authenticated");
} else {
  console.log("Authenticated user:", user);
}

  return (
    <>
      <Breadcrumb route={"پنل کاربری"} />
      <div className={styles.layout}>
        <section className={styles.section}>
          <Sidebar />
          <div className={styles.contents}>
            <Topbar userName={user.name} role={user.role} />
            {children}
          </div>
        </section>
      </div>
    </>
  );
};

export default Layout;
