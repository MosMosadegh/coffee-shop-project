import React, { use } from "react";
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
  console.log("🚀 ~ Layout ~ session:", session)
  if (!session.user.role) {
    redirect("/login-register");
  }

  const user = session.user;
  const userName = user.name ? user.name : user.phone;

  return (
    <>
      <NavbarWithUser />
      <div className="container">
        <Breadcrumb route={"پنل کاربری"} />
        <div className="text-xs md:text-sm lg:text-base">
          <div className={`${styles.layout} block lg:hidden dark:bg-slate-600`}>
            <section className="">
              <div className={styles.contents}>
                <Topbar userName={userName} role={user.role} />
                <Sidebar user={userName} roleCheck={user.role} />
                <div className="">{children}</div>
              </div>
            </section>
          </div>
          <div className={`${styles.layout} hidden lg:block dark:bg-slate-600`}>
            <section className={`${styles.section}  `}>
              <div className={styles.contents}>
                <Topbar userName={userName} role={user.role} />
                {children}
              </div>
              <div className="">
                <Sidebar user={userName} roleCheck={user.role} />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
