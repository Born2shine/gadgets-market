'use client'


import  Link  from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@/context/authContext";
import { toast } from "react-toastify";
import {ColorRing} from 'react-loader-spinner'
const Register = () => {
  const {error, registerUser, loading, clearError} =  useContext(AuthContext)

  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  useEffect(()=>{
    if(error){
      toast.error(error)
      clearError()
    }
  }, [error])

  const submitHandler = (e)=>{
      e.preventDefault();
      registerUser({name, email, password})

  }

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-gray-50 shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Type your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Type your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Type your password"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700" onClick={submitHandler}
        >
           {loading? (<span className="flex justify-center items-center gap-2"><span>Submitting</span>                   
                   <ColorRing
                      visible={true}
                      height="30"
                      width="30"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                      className="hidden"/>
                   </span>): "Register"}
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
