'use client'

import AuthContext from "@/context/authContext";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdatePassword = () => {

  const{user, error, clearErrors, loading, updatePassword} = useContext(AuthContext)

  const[currentPassword, setCurrentPassword] = useState("")
  const[newPassword, setNewPassword] = useState("")


const submitHandler = (e)=>{
  e.preventDefault();
  updatePassword({currentPassword, newPassword})
}

useEffect(()=>{
if(error){
  toast.error(error)
  clearErrors()
}
}, [error])
  return (
    <>
    
              <div
                style={{ maxWidth: "480px" }}
                className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
              >
                <form onSubmit={submitHandler}>
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
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                </form>
              </div>
        
    </>
  );
};

export default UpdatePassword;
