import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/ScrollToTop";
import QueryProviders from "./queryProviders";
import ProviderSession from "./sessionPovider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <body className={`${inter.className} dark:bg-slate-600`}>
        <ProviderSession>
          <QueryProviders>
            <AOSInit />
            {children}
            <ScrollToTop />
          </QueryProviders>
        </ProviderSession>
      </body>
    </html>
  );
}
