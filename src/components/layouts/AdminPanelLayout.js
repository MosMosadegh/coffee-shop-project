import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import { redirect } from "next/navigation";
import NavbarWithUser from "../modules/navbar/NavbarWithUser";
import Footer from "../modules/footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { authAdmin } from "@/utils/isLogin";

const Layout = async ({ children }) => {

    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login-register");
    }
    if (session.user.role !== "ADMIN") {
      redirect("/p-user");
    }
    const user = session.user;
    console.log("🚀 ~ page-layoutAdmin ~ user:", user);

  // const admin = await authAdmin();
  // if (!admin) {
  //   //console.log("User is not an admin");
  //   return redirect("/login-register");
  // } else {
  //   //console.log("Authenticated admin:", admin);
  // }

  return (
    <>
      <NavbarWithUser />
      <Breadcrumb route={"پنل مدیریت"} />
      <div className={`${styles.layout}  dark:bg-slate-500`}>
        <section className={styles.section}>
          <Sidebar />
          <div className={styles.contents}>
            <Topbar adminName={user.name} />
            {children}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
