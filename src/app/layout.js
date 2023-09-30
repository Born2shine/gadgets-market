import Header from "@/components/layout/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { GlobalProvider } from "./globalProvider";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "get-Gadgets",
  description: "A one stop full Tech Gadgets ecommerce web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
