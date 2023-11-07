import UpdateOrder from "@/components/admin/UpdateOrder";
import UpdateUser from "@/components/admin/UpdateUser";
import { getCookieName } from "@/helpers/helpers";
import axios from "axios";
import {cookies} from 'next/headers'


const getUser= async(id)=>{
    const nextCookies = cookies();  


    const cookieName = getCookieName()

    const nextAuthSessionToken = nextCookies.get(cookieName)

    const { data } = await axios(`${process.env.URL}/api/address`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`
        }
    });

    return data
}



const AdminUserDetailsPage = async({params}) => {  
    const isValidId = mongoose.isValidObjectId(params?.id)

    if(!isValidId){
        return redirect('/')
    }
    const data = await getUser(params?.id)
   
    
    return  <UpdateUser user={data?.user}/> ;
}
 
export default AdminUserDetailsPage ;