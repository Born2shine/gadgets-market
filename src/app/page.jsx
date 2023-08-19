import axios from "axios";
import ListProducts from "@/components/products/ListProducts";
import queryString from "query-string";

const getAllProducts = async(searchParams)=>{
const urlParams= {
    keyword:searchParams.keyword,
    page: searchParams.page
}


const searchQuery = queryString.stringify(urlParams) 

    const {data} = await axios.get(`${process.env.URL}/api/products?${searchQuery}`)
    return data
} 

const HomePage = async ({searchParams}) => {
    const products = await getAllProducts(searchParams)
    
    return ( 
        <ListProducts data={products}/>
     );
}
 
export default HomePage;