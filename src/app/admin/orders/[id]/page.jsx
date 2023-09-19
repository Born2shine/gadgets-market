

import UpdateOrder from "@/components/admin/UpdateOrder";
import axios from "axios";
import {cookies} from 'next/headers'


const getOrder= async(id)=>{
    const nextCookies = cookies();  


    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    const { data } = await axios(`${process.env.URL}/api/admin/orders/${id}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    });

    return data
}



const AdminOrderDetailsPage = async({params}) => {  
    const data = await getOrder(params?.id)
   
    
    return  <UpdateOrder order={data?.order}/> ;
}
 
export default AdminOrderDetailsPage ;