"use client"


import ProductContext from "@/context/productContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


const UploadImages = ({id}) => {
  const{loading, uploadProductImages, error, clearError} = useContext(ProductContext)
  const [images, setImages]= useState("")
  const [imagesPreview, setImagesPreview]= useState("")

  useEffect(()=>{  

  if(error){
    toast.error(error)
    clearError()
  }
  }, [error])


const submitHandler =(e)=>{
  e.preventDefault();

  const formData = new FormData()  
    formData.append('image', images)

    uploadProductImages(formData, id) 
}

 



  const onchange=(e)=>{
    const reader = new FileReader();
      reader.onloadend=()=>{
              setImagesPreview(reader.result)
            }
          reader.readAsDataURL(e.target.files[0])
        setImages(e.target.files[0])   
  
  } 
  return (
    
         
            <div
              style={{ maxWidth: "480px" }}
              className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
            >
              <form onSubmit={submitHandler}>
                <h2 className="mb-3 text-2xl font-semibold">
                  Upload Product Images
                </h2>

                <div className="mb-4 flex flex-col md:flex-row">
                  <div className="w-full">
                    <input
                      className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-8"
                      type="file"
                      id="formFile"
                      multiple
                      onChange={onchange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 my-5">                
                    <Image
                      src={imagesPreview}                     
                      alt="Preview"
                      className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
                      width="50"
                      height="50"
                    />                 
                </div>

                <button
                  type="submit"
                  className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >{loading? "uploading" : "Upload"}
                 
                </button>
              </form>
            </div>
         
  );
};

export default UploadImages;
