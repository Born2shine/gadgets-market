

import Shipping from "@/components/cart/Shipping";
import axios from "axios";
import {cookies} from 'next/headers'

const getAllAddress= async()=>{

    const nextCookies = cookies();
    const cookieName = getCookieName()

    const nextAuthSessionToken = nextCookies.get(cookieName)

    const { data } = await axios(`${process.env.URL}/api/address`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`
        }
    });

    return data?.addresses
}



const ShippingPage = async() => {  
    const addresses = await getAllAddress()
    return  <Shipping addresses={addresses}/> ;
}
 
export default ShippingPage;