'use client'
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSistrix } from "react-icons/fa6"

const Search = () => {
  //implement react-hook-form for better perfomance
  const [keyword, setKeyword] = useState()
  const router = useRouter()

const submitHandler= (e)=>{
e.preventDefault();

if(keyword){
router.push(`/?keyword=${keyword}`)
console.log(keyword)
}else{
router.push('/')
console.log('show------')
}


}

  return (
    <form onSubmit={submitHandler} className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4 lg: ml-16">
      <input
        className="flex-grow appearance-none border border-gray-200 bg-white rounded-md mr-2 py-2 px-3   hover:shadow-md focus:outline-none focus:shadow-lg transition-all duration-1000 ease-out"
        type="text"
        placeholder="Enter your keyword"
        required
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
      />
      <button
        type="button"
        className="px-4 py-2  text-white border border-transparent bg-blue-600  rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        onClick={submitHandler}
      >
        <FaSistrix className="hover:scale-100 transition-all duration-300 btn "/>
        <span className="hidden md:block">Search</span> 
        
      </button>
    </form>
  );
};

export default Search
