

import UpdateAddress from "@/components/user/UpdateAddress";
import { getCookieName } from "@/helpers/helpers";
import axios from "axios";
import {cookies} from 'next/headers'

const getAddress= async(id)=>{

    const nextCookies = cookies();

    const cookieName = getCookieName()

    const nextAuthSessionToken = nextCookies.get(cookieName)

    const { data } = await axios(`${process.env.URL}/api/address`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`
        }
    });

    return data?.address
}



const UpdateAddressPage = async({params}) => {  
    const isValidId = mongoose.isValidObjectId(params?.id)

    if(!isValidId){
        return redirect('/')
    }
    const address = await getAddress(params?.id)
    return  <UpdateAddress id={params.id} address={address}/> ;
}
 
export default UpdateAddressPage;