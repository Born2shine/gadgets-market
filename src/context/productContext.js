"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  const newProduct = async (product) => {
    const { data } = await axios.post(
      `${process.env.URL}/api/admin/products`,
      product
    );
    if (data) {
      router.replace("/admin/products");
    } else {
      toast.error("ERROR!!");
      setError(response?.data?.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        updated,
        error,
        newProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
