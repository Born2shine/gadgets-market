"use client";

import React from "react";
import Link from "next/link";
import Search from "./Search";
import { useContext, useEffect } from "react";
import Image from "next/image";
import CartContext from "@/context/cardContext";
import {useSession} from "next-auth/react";
import AuthContext from "@/context/authContext";
import { FaCartShopping } from "react-icons/fa6"



const Header = () => {

  const {user, setUser} = useContext(AuthContext)

const {data} = useSession();

useEffect(()=>{
  setUser(data?.user)
},[data])

  const {addItemToCart, cart} = useContext(CartContext)
  return (
    <header className="bg-gradient-to-r from-green-50 via-blue-200 to-blue-50 py-2 border-b header">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5 mix-blend-darken">
            <a href="/">
              <Image
                src="/images/logo.jpg"
                height="40"
                width="120"
                alt="BuyNow"
                
              />
            </a>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto ">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300 flex items-center relative"
            >
              <i className="text-black w-5"><FaCartShopping/></i>
              <span className="hidden lg:inline ml-1">
                Cart 
              </span>
              <b className="absolute -top-1 right-0 bg-pink-600 text-white text-sm overflow-hidden rounded-xl px-1">{ cart?.cartItems? cart?.cartItems?.length : 0}</b>
            </Link>
            {!user? (
            <Link
              href="/login"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-user"></i>
              <span className="hidden lg:inline ml-1">Sign in</span>
            </Link>
            ) : (
            <Link href="/me">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                <Image className="w-10 h-10 rounded-full" src={user?.avatar?user?.avatar?.url: "/images/default.png"} alt='user'  height="10"
                width="10"/>
                <div className="space-y-1 font-medium">
                  <p>
                   {user?.name}
                    <time className="block text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </time>
                  </p>
                </div>
              </div>
              </Link>
            )}           
          </div>
          {/* <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
