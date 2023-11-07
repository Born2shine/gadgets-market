import axios from "axios";

import queryString from "query-string";
import {cookies} from 'next/headers'
import Products from "@/components/admin/Products";
import { getCookieName } from "@/helpers/helpers";

const getAllProducts = async(searchParams)=>{
const urlParams= {
    keyword:searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    
}


const searchQuery = queryString.stringify(urlParams) 



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

const HomePage = async ({searchParams}) => {
    const data = await getAllProducts(searchParams)
    
    return ( 
        <Products data={data}/>
     );
}
 
export default HomePage;