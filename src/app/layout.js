import Header from "@/components/layout/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalProvider } from "./globalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buynow",
  description: "an e-electronics market app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
