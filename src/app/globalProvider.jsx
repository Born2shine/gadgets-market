"use client"
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cardContext";
import{SessionProvider} from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export function GlobalProvider({ children }) {
  return(
    <>
    <ToastContainer position="top-center" autoClose={5000}
hideProgressBar={true}/>
    <AuthProvider>
      <CartProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
      </CartProvider>
     </AuthProvider>
     </>
  )
}
