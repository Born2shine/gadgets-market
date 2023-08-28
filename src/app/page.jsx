import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import queryString from "query-string";
import {cookies} from 'next/headers'

const getAllProducts = async(searchParams)=>{
const urlParams= {
    keyword:searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "ratings[gte]": searchParams.ratings,
    "price[lte]": searchParams.min,
    "price[gte]": searchParams.max,
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
    const products = await getAllProducts(searchParams)
    
    return ( 
        <ListProducts data={products}/>
     );
}
 
export default HomePage;