'use client'

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import CustomPagination from "../layout/customPagination";
import OrderContext from "@/context/orderContext";
import { toast } from "react-toastify";
import { FaPenClip, FaTrashCan} from "react-icons/fa6";


const Orders = ({orders}) => {
  const{error, clearError, deleteOrder} = useContext(OrderContext)
  // console.log(orders?.orders?._id)

  const deleteHandler =(id)=>{
    deleteOrder(id)
  }



  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);
  

  return (
    
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <h1 className="text-3xl my-5 ml-4 font-bold border border-b border-gray-100 ">{orders?.ordersCount} Orders</h1>
              <table className="w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount Paid
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.orders?.map((order)=>(
                  <tr className="bg-white" key={order._id}>
                    <td className="px-6 py-2">{order?._id}</td>
                    <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
                    <td className="px-6 py-2">{order.orderStatus}</td>
                    <td className="px-6 py-2">
                      <div>
                        <Link
                          href={`/admin/orders/${order?._id}`}
                          className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                        >
                          <FaPenClip/>
                        </Link>
                        <a className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer" onClick={()=>deleteHandler(order?._id)}>
                          <FaTrashCan/>
                        </a>
                      </div>
                    </td>
                  </tr>

                  ))}
                </tbody>
              </table>
              {users?.resPerPage > users?.usersCount && (
              <div className="mb-6">
              <CustomPagination resPerPage={users?.resPerPage}
              productsCount={users?.usersCount}/>
              </div>
              )}
            </div>
         
  );
};

export default Orders;
