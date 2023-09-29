'use client'
import Link from 'next/link'
import { useState } from 'react';
import { toast } from "react-toastify";
import {signIn} from 'next-auth/react'
import{useRouter, useSearchParams} from 'next/navigation'
import {ColorRing} from 'react-loader-spinner'



const Login = () => {

const[email, setEmail] = useState('')
const[password, setPassword] = useState('')
const[loading, setLoading] = useState(null)

const router = useRouter();

const params = useSearchParams();

const callBackUrl = params.get('callbackUrl');



//THE SIGNIN SUBMIT HANDLER
  
  const submitHandler = async(e)=>{
      e.preventDefault();
      setLoading(true)
    const data= await signIn('credentials', {
      email,
      password,
      redirect: false

      // callbackUrl:  callBackUrl ? parseCallbackUrl(callBackUrl): "/"
    })
   
    if (data?.error){
      setLoading(false)
        toast.error(data?.error)
    }

    if(data?.ok){ 
      setLoading(false)     
      toast.success('LOGIN SUCCESFUL!')
      router.push('/')
    }      

  }

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-gray-50 shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Login</h2>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            value={email}           
            placeholder="Type your email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            value={password}         
            placeholder="Type your password"
            minLength={6}
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 "
        >
         {loading? (<span className="flex justify-center items-center gap-2"><span>logging In</span>                   
                   <ColorRing
                      visible={true}
                      height="30"
                      width="30"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                      className="hidden"/>
                   </span>): "Login"} 
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
