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

  const updateProduct = async (product, id) => {
    const { data } = await axios.put(
      `${process.env.URL}/api/admin/products/${id}`,
      product
    );
    if (data) {
      setUpdated(true);

      router.replace(`/admin/products/${id}`);
    } else {
      setError(response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await axios.delete(
      `${process.env.URL}/api/admin/products/${id}`
    );
    if (data) {
      router.replace(`/admin/products`);
    } else {
      setError(response?.data?.message);
    }
  };

  const uploadProductImages = async (formData, id) => {
    console.log([...formData.entries()]);
    setLoading(true);
    const { data } = await axios.post(
      `${process.env.URL}/api/admin/products/upload_images/${id}`,
      formData
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    if (data?.data) {
      setLoading(false);
      router.replace("/admin/products");
    } else {
      setError(response?.data?.message);
    }
  };

  const postProductReview = async (reviewData) => {
    try {
      const { data } = await axios.put(
        `${process.env.URL}/api/products/review`,
        reviewData
      );
      if (data?.success) {
        router.replace(`/product/${reviewData?.productId}`);
      }
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error);
    }
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <ProductContext.Provider
      value={{
        loading,
        updated,
        error,
        newProduct,
        uploadProductImages,
        clearError,
        updateProduct,
        setUpdated,
        deleteProduct,
        postProductReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
