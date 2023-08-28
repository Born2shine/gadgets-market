import NewAddress from "@/components/user/NewAddress";
import {cookies} from 'next/headers'

const newAddressPage = () => {
    const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')

    
    return ( <NewAddress cookiesToken={nextAuthSessionToken}/> );
}
 
export default newAddressPage;