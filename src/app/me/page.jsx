
import Profile from "@/components/auth/Profile";
import axios from "axios";
import {cookies} from 'next/headers'

const getAllAddress= async()=>{

    const nextCookies = cookies()

    const nextAuthSessionToken = nextCookies('next-auth.session-token')

    const { data } = await axios(`${process.env.URL}/api/address`, {
        headers: {
            cookies: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    });

    return data?.addresses
}



const ProfilePage = async() => {  
    const addresses = await getAllAddress()
    return  <Profile addresses={addresses}/> ;
}
 
export default ProfilePage;