import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/ScrollToTop";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "  صفحه اصلی- فروشگاه قهوه مصطفی ",
  description: "coffee poject with next",
  icons: {
    icon: "images/Archigraphs-Collection-Coffee.32.png",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={`${inter.className} dark:bg-slate-500`}>
        <Providers>
          <AOSInit />
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
