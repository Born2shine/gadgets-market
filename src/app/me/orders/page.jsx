
import ListOrders from "@/components/order/ListOrders";
import { getCookieName } from "@/helpers/helpers";
import axios from "axios";
import {cookies} from 'next/headers'
import queryString from "query-string";

const getAllOrders= async(searchParams)=>{

    const nextCookies = cookies();
    
    const urlParams ={
        page: searchParams.page || 1
    }

    const queryStr = queryString.stringify(urlParams)

    

    const cookieName = getCookieName()

    const nextAuthSessionToken = nextCookies.get(cookieName)

    const { data } = await axios(`${process.env.URL}/api/address`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`
        }
    });

    return data
}



const myOrdersPage = async({searchParams}) => {  
    const orders = await getAllOrders(searchParams)
   
    
    return  <ListOrders orders={orders}/> ;
}
 
export default myOrdersPage;