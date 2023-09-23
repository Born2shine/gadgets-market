import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

const getProductdet = async (id)=>{
const {data}  = await axios.get(`${process.env.URL}/api/products/${id}`);
return data?.product;

}

const ProductDetailsPage = async({params}) => {

    const isValidId = mongoose.isValidObjectId(params?.id)

    if(!isValidId){
        return redirect('/')
    }
    

    const product  = await getProductdet(params?.id)

    
    
    return  <ProductDetails  product={product}/> ;
}
 
export default ProductDetailsPage;