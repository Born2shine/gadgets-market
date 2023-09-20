
import Orders from "@/components/admin/Orders";
import Users from "@/components/admin/Users";

import axios from "axios";
import {cookies} from 'next/headers'
import queryString from "query-string";

const getAllUsers= async(searchParams)=>{

    const nextCookies = cookies();
    
    const urlParams ={
        page: searchParams.page || 1
    }

    const queryStr = queryString.stringify(urlParams)

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    const { data } = await axios(`${process.env.URL}/api/admin/users?${queryStr}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    });

    return data
}



const AdminUsersPage = async({searchParams}) => {  
    const users = await getAllUsers(searchParams)
   
    
    return  <Users users={users}/> ;
}
 
export default AdminUsersPage;