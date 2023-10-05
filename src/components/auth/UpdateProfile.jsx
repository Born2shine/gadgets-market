'use client'

import { useState, useContext } from "react";
import AuthContext from "@/context/authContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {ColorRing} from 'react-loader-spinner'

const UpdateProfile = () => {
  const{user, error, clearError, loading, updateUser} = useContext(AuthContext)

  const[email, setEmail] = useState(user?.email)
  const[name, setName] = useState(user?.name)
  const[avatar, setAvatar] = useState('')
  const[avatarPreview, setAvatarPreview] = useState('/images/default.png')

useEffect(()=>{
  if(avatar){
    const reader = new FileReader();
    reader.onloadend=()=>{
      setAvatarPreview(reader.result)
    }
    reader.readAsDataURL(avatar)
  }else{
    console.log('not!')
  }
  
},[avatar])

  useEffect(()=>{
    if(user){
      setEmail(user.email)
      setName(user.name)
    }

  if(error){
    toast.error(error)
    clearError()
  }
  }, [user, error, clearError])


const submitHandler =(e)=>{
  e.preventDefault();

  const formData = new FormData()

  formData.append('name', name)
  formData.append('email', email)
  formData.append('image', avatar) 
 

  updateUser(formData)
}

const onchange=(e)=>{

  const file  = e.target.files[0]  
 
  setAvatar(file)
  

} 


  return (
    <>
     
              <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
              >
                <form onSubmit={submitHandler}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    Update Profile
                  </h2>

                  <div className="mb-4">
                    <label className="block mb-1"> Full Name </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your name"
                      value={name}
                      required
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1"> Email </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your email"
                      value={email}
                      required
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1"> Avatar </label>
                    <div className="mb-4 flex flex-col md:flex-row">
                      <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                        <img
                          className="w-14 h-14 rounded-full"
                          src={avatarPreview}
                        />
                      </div>
                      <div className="md:w-2/3 lg:w-80">
                        <input
                          className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                          type="file"
                          accept="image/*"
                          name="image"
                          id="formFile"
                          onChange={(e)=>onchange(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  disabled={loading? true:false}>
                   {loading? (<span className="flex justify-center items-center gap-2"><span>updating</span>                   
                   <ColorRing
                      visible={true}
                      height="30"
                      width="30"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                      className="hidden"/>
                   </span>): "update"} 
                   
                  
                  </button>
                </form>
              </div>
            
    </>
  );
};

export default UpdateProfile;
