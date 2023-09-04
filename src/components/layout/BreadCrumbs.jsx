"use client"

import React from "react";
import Link from "next/link";

const BreadCrumbs = ({breadcrumbs}) => {
  
  return (
    <section className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadcrumbs?.map((el, i)=>(
          <li className="inline-flex items-center" key={el}>
            <Link href={el.url} className="text-gray-600 hover:text-blue-600">
              {el.name}
            </Link>
            {breadcrumbs.length -1 !== i && ( <i className="ml-3 text-gray-400 fa fa-chevron-right"></i>)}           
          </li>

          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
