import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
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
  const useRole = user.role;
  const userName = user.name ? user.name : user.phone;
  // console.log("🚀 ~ page-layoutAdmin ~ user:", user);

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
      <div className="container">
        <Breadcrumb route={"پنل مدیریت"} />
        <div className="text-xs md:text-sm lg:text-base">
          <div
            className={`${styles.layout}  block lg:hidden dark:bg-slate-600`}
          >
            <section className="">
              <div className={styles.contents}>
              <Topbar userName={user.name} role={useRole} />
              <Sidebar user={userName} roleCheck={useRole} />
              </div>
              <div className="">{children}</div>
            </section>
          </div>
          <div
            className={`${styles.layout}  hidden lg:block dark:bg-slate-600`}
          >
            <section className={styles.section}>
              <div className={styles.contents}>
              <Topbar userName={user.name} role={useRole} />
                {children}
              </div>
              <div className="">
              <Sidebar user={userName} roleCheck={useRole} />
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
