
import { CartProvider } from "@/context/cardContext";

export function GlobalProvider({ children }) {
  return(
     <CartProvider>{children}</CartProvider>
  )
}
