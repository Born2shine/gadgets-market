import UploadImages from "@/components/admin/UploadImages";



const ImageUploadPage = async ({params}) => {

    const isValidId = mongoose.isValidObjectId(params?.id)

    if(!isValidId){
        return redirect('/')
    }
    
    
    return ( 
        <UploadImages id={params.id}/>
     );
}
 
export default ImageUploadPage;