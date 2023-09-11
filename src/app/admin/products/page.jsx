import axios from "axios";

import queryString from "query-string";
import {cookies} from 'next/headers'
import Products from "@/components/admin/Products";

const getAllProducts = async(searchParams)=>{
const urlParams= {
    keyword:searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    
}


const searchQuery = queryString.stringify(urlParams) 



const nextCookies = cookies();

    const nextAuthSessionToken = nextCookies.get('next-auth.session-token')


    const {data} = await axios.get(`${process.env.URL}/api/products?${searchQuery}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`
        }
    })
    return data
} 

const HomePage = async ({searchParams}) => {
    const data = await getAllProducts(searchParams)
    
    return ( 
        <Products data={data}/>
     );
}
 
export default HomePage;