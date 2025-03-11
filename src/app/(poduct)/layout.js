import Footer from "@/components/modules/footer/Footer";
import NavbarWithUser from "@/components/modules/navbar/NavbarWithUser";


export default function ProductLayout({ children }) {
    return (
      <div>
        <NavbarWithUser />
        <main className="text-sm md:text-base lg:text-lg">{children}</main>
        <Footer />
      </div>
    );
  }