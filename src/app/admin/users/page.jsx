
import Orders from "@/components/admin/Orders";
import Users from "@/components/admin/Users";
import { getCookieName } from "@/helpers/helpers";

import axios from "axios";
import {cookies} from 'next/headers'
import queryString from "query-string";

const getAllUsers= async(searchParams)=>{

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



const AdminUsersPage = async({searchParams}) => {  
    const users = await getAllUsers(searchParams)
   
    
    return  <Users users={users}/> ;
}
 
export default AdminUsersPage;