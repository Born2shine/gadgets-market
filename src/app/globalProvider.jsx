"use client"
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cardContext";
import{SessionProvider} from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import { ProductProvider } from "@/context/productContext";
import { OrderProvider } from "@/context/orderContext";
import { IconContext } from "react-icons";


export function GlobalProvider({ children }) {
  return(
    <>
    <ToastContainer position="top-center" autoClose={5000}
hideProgressBar={true}/>
<IconContext.Provider value={{ className: 'react-icons' }}>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
        <ProductProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
          </ProductProvider>
          </OrderProvider>
      </CartProvider>
     </AuthProvider>
     </IconContext.Provider>    
     </>
  )
}
