

import UpdateAddress from "@/components/user/UpdateAddress";
import axios from "axios";
import {cookies} from 'next/headers'

const getAddress= async(id)=>{

    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    const { data } = await axios(`${process.env.URL}/api/address/${id}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    });

    return data?.address
}



const UpdateAddressPage = async({params}) => {  
    const address = await getAddress(params?.id)
    return  <UpdateAddress id={params.id} address={address}/> ;
}
 
export default UpdateAddressPage;