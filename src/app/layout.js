import AOSInit from "@/utils/aos";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/utils/ScrollToTop";
import Navbar from "@/components/modules/navbar/Navbar";
import Footer from "@/components/modules/footer/Footer";
import { authUser } from "@/utils/isLogin";
import connectToDb from "@/configs/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "  صفحه اصلی- فروشگاه قهوه مصطفی ",
  description: "coffee poject with next 13",
  icons: {
    icon: "images/Archigraphs-Collection-Coffee.32.png",
  },
};

export default async function RootLayout({ children }) {
  await connectToDb();
  const user = await authUser();

  const userName = user && user.name ? user.name : null;

  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />
        <Navbar userName={userName} />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
