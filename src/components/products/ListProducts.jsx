"use client"

import React from "react";


import Filters from "../layout/Filters";
import Header from "../layout/Header";
import ProductItem from "./productItem";
import CustomPagination from "../layout/customPagination";

const ListProducts = ({data}) => { 
  console.log(data)
  return (
    <>
     
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Filters />
            <main className="md:w-2/3 lg:w-3/4 px-3">           
              {
                data?.products?.map((product)=>
                  (
                    <ProductItem key={product._id} product={product}/>
                  )
                )
              }

              <CustomPagination resPerPage={data?.resPerPage} productsCount= {data?.filteredProductCount}/>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListProducts;
