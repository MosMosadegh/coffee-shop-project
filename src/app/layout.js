import AOSInit from "@/utils/aos";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/utils/ScrollToTop";
import Navbar from "@/components/modules/navbar/Navbar";
import Footer from "@/components/modules/footer/Footer";
import Providers from "./providers";

import connectToDb from "@/configs/db";
import { authUser } from "@/utils/isLogin";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "  صفحه اصلی- فروشگاه قهوه مصطفی ",
  description: "coffee poject with next",
  icons: {
    icon: "images/Archigraphs-Collection-Coffee.32.png",
  },
};

export default async function RootLayout({ children }) {
  const user = await authUser();
  console.log("🚀 ~ RootLayout ~ user:", user);
  const userData = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    : null;
  return (
    <html lang="fa">
      <body className={inter.className}>
        <Providers>
          <AOSInit />
          <Navbar user={userData} />

          {children}
          <ScrollToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
