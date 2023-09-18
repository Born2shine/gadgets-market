import UploadImages from "@/components/admin/UploadImages";



const ImageUploadPage = async ({params}) => {
    
    
    return ( 
        <UploadImages id={params.id}/>
     );
}
 
export default ImageUploadPage;