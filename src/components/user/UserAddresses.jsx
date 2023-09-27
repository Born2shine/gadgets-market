'use client'
import React from "react";
import Link from 'next/link'
import { FaMapLocationDot } from "react-icons/fa6";

const UserAddresses = ({address}) => {
  return (
    <Link href={`/address/${address._id}`}>
      <div className="mb-5 gap-4">
        <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md shadow-xl cursor-pointer lg:shadow-none lg:hover:shadow-2xl transition-all duration-300 ease-in-out">
          <div className="mr-3">
            <span className="flex items-center justify-center text-gray-500 w-12 h-12 bg-white rounded-full shadow mt-2">
              <FaMapLocationDot/>
              
            </span>
          </div>
          <figcaption className="text-gray-600">
            <p>
              {address.street} <br /> {address.city}, {address.state}, {address.zipCode}, {address.country}
              <br />
              Phone no: {address.phoneNo}
            </p>
          </figcaption>
        </figure>
      </div>
    </Link>
  );
};

export default UserAddresses;
