'use client'


// import { countries, getNames } from "country-list";
import { countries} from "countries-list";
import AuthContext from "@/context/authContext";
import Sidebar from "../layout/Sidebar";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import {ColorRing} from 'react-loader-spinner'

const NewAddress = ({cookiesToken}) => {
  const {addNewAddress, loading, error} = useContext(AuthContext)
  const countriesList = Object.values(countries)
  

  const [street, setStreet] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [phoneNo, setPhoneNo] = useState('')

  const submitHandler=(e)=>{
    e.preventDefault() 
  const newAddress = {
    street, zipCode, country, state, city, phoneNo
  }
  addNewAddress(newAddress, cookiesToken)
  
  }

  useEffect(()=>{
    if(error){
        toast.error(error)
        clearErrors()
    }
  },[error])

  return (
    <>
      <section className="py-5 sm:py-5 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
            <h1 className="text-bold text-2xl">Address Dashboard</h1>
        </div>
        </section>
        <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Sidebar />
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
              >
                <form onSubmit={submitHandler}>
                  <h2 className="mb-5 text-2xl font-semibold">
                    Add new Address
                  </h2>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1">street* </label>
                    <input
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      type="text"
                      placeholder="Type your address"
                      value={street}                      
                      onChange={(e)=>setStreet(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-3">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> City </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your city"
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> State </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type state here"
                        value={state}
                        onChange={(e)=>setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-2">
                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> ZIP code </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type zip code here"
                        value={zipCode}
                        onChange={(e)=>setZipCode(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4 md:col-span-1">
                      <label className="block mb-1"> Phone No </label>
                      <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Type phone no here"
                        value={phoneNo}
                        onChange={(e)=>setPhoneNo(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 md:col-span-2">
                    <label className="block mb-1"> Country </label>
                    <select className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"  value={country}
                       onChange={(e)=>setCountry(e.target.value)} required>
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name} 
                       >
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="my-2 px-4 py-2 flex items-center justify-center w-full  text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    {loading? <ColorRing
                              visible={true}
                              height="40"
                              width="40"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/> : " Add"
                      }
                   
                  </button>
                 
                </form>
              </div>
              </main>
            </div>
        </div>
        </section>
           
    </>
  );
};

export default NewAddress;
