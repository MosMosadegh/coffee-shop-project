import AOSInit from "@/utils/aos";
import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "@/utils/ScrollToTop";
import Navbar from "@/components/modules/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "  صفحه اصلی- فروشگاه قهوه مصطفی ",
  description: "coffee poject with next 13",
  icons: {
    icon: "images/Archigraphs-Collection-Coffee.32.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
