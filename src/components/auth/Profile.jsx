'use client'


import Link from 'next/link'
import UserAddresses from "../user/UserAddresses";
import { useContext } from 'react';
import AuthContext from '@/context/authContext';
import { FaAddressBook } from "react-icons/fa6";
const Profile = ({addresses}) => {
const {user} = useContext(AuthContext)


  return (
    <>
      
              <figure className="flex items-start sm:items-center">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={user?.avatar? user?.avatar?.url :"/images/default.png"}
                    alt={user?.name}
                  />
                </div>
                <figcaption>
                  <h5 className="font-semibold text-lg">{user?.name}</h5>
                  <p>
                    <b>Email:</b> {user?.email} | <b>Joined On:</b>
                    {user?.createdAt.substring(0, 10)}
                  </p>
                </figcaption>
              </figure>

              <hr className="my-4" />
              {addresses.map((address)=>(
                  <UserAddresses key={address._id} address={address} />
              )
              )}
              

              <Link href="/address/new">
                <button className="px-4 py-2 text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100 flex items-center gap-2">
                 <FaAddressBook/> Add new address
                </button>
              </Link>

              <hr className="my-4" />
           
    </>
  );
};

export default Profile;
