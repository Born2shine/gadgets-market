import UpdateOrder from "@/components/admin/UpdateOrder";
import UpdateUser from "@/components/admin/UpdateUser";
import axios from "axios";
import {cookies} from 'next/headers'


const getUser= async(id)=>{
    const nextCookies = cookies();  


    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    const { data } = await axios(`${process.env.URL}/api/admin/users/${id}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    });

    return data
}



const AdminUserDetailsPage = async({params}) => {  
    const data = await getUser(params?.id)
   
    
    return  <UpdateUser user={data?.user}/> ;
}
 
export default AdminUserDetailsPage ;