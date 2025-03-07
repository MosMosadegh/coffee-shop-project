import Footer from "@/components/modules/footer/Footer";
import NavbarWithUser from "@/components/modules/navbar/NavbarWithUser";

export default function MainLayout({ children }) {
  return (
    <div className="">
      <NavbarWithUser />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
