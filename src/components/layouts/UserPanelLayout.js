import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import NavbarWithUser from "../modules/navbar/NavbarWithUser";
import Footer from "../modules/footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session.user.role) {
        redirect("/login-register");
      }
  const user = session.user;


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
