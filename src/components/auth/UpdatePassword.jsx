'use client'

import AuthContext from "@/context/authContext";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {ColorRing} from 'react-loader-spinner'

const UpdatePassword = () => {

  const{user, error, clearError, loading, updatePassword} = useContext(AuthContext)

  const[currentPassword, setCurrentPassword] = useState("")
  const[newPassword, setNewPassword] = useState("")


const submitHandler = (e)=>{
  e.preventDefault();
  updatePassword({currentPassword, newPassword})
}

useEffect(()=>{
if(error){
  toast.error(error)
  clearError()
}
}, [error])
  return (
    <>
    
              <div
                style={{ maxWidth: "480px" }}
                className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
              >
                <form onSubmit={submitHandler} className="shadow-xl rounded p-2">
                  <h2 className="mb-5 text-2xl font-semibold">
                    Update Password
                  </h2>

                  <div className="mb-4">
                    <label className="block mb-1"> Current Password </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="password"
                      placeholder="Type your password"
                      value={currentPassword}
                      minLength={6}
                      required
                      onChange={(e)=>setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1"> New Password </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="password"
                      placeholder="Type your password"
                      value={newPassword}
                      minLength={6}
                      required
                      onChange={(e)=>setNewPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full flex justify-center items-center text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                   {loading? <ColorRing
                              visible={true}
                              height="40"
                              width="40"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/> : " update"
                      }
                  </button>
                </form>
              </div>
        
    </>
  );
};

export default UpdatePassword;
