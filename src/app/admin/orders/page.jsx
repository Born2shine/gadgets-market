
import Orders from "@/components/admin/Orders";
import ListOrders from "@/components/order/ListOrders";
import axios from "axios";
import {cookies} from 'next/headers'
import queryString from "query-string";

const getAllOrders= async(searchParams)=>{

    const nextCookies = cookies();
    
    const urlParams ={
        page: searchParams.page || 1
    }

    const queryStr = queryString.stringify(urlParams)

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    const { data } = await axios(`${process.env.URL}/api/admin/orders?${queryStr}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    });

    return data
}



const AdminOrdersPage = async({searchParams}) => {  
    const orders = await getAllOrders(searchParams)
   
    
    return  <Orders orders={orders}/> ;
}
 
export default AdminOrdersPage;