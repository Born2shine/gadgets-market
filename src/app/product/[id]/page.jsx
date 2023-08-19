import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";

const getProductdet = async (id)=>{
const {data}  = await axios.get(`${process.env.URL}/api/products/${id}`);
return data?.product;
}

const ProductDetailsPage = async({params}) => {

    const product  = await getProductdet(params.id)
    
    
    return  <ProductDetails  product={product}/> ;
}
 
export default ProductDetailsPage;