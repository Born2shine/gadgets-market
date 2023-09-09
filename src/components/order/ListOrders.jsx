'use client'

import React, { useContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import CustomPagination from "../layout/customPagination";
import CartContext from "@/context/cardContext";
import { useRouter, useSearchParams } from "next/navigation";


const ListOrders = ({orders}) => {

  console.log(orders)
  const{clearCart} = useContext(CartContext)

const router = useRouter()
const params = useSearchParams()

const orderSuccess = params.get("order_success")

useEffect(()=>{
  if(orderSuccess){
    clearCart()
    router.replace("/me/orders")
  }
})

  return (
    <>     
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.orders?.map((order)=>(
        <OrderItem key={order.id} order={order}/>
        
      ))}
      <CustomPagination resPerPage={orders?.resPerPage}
      productsCount={orders?.ordersCount}/>
    </>
  );
};

export default ListOrders;
