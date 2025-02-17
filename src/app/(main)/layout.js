import Footer from "@/components/modules/footer/Footer";
import NavbarWithUser from "@/components/modules/navbar/NavbarWithUser";


export default function MainLayout({ children }) {
    return (
      <div>
        <NavbarWithUser />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }