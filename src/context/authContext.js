"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies, Cookies } from "react-cookie";

import axios from "axios";
import { toast } from "react-toastify";
import Id from "@/pages/api/products/[id]";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const router = useRouter();
  let cookie;
  if (typeof window !== "undefined") {
    cookie = document.cookie;
    // .split(";")
    // .filter((row) => row.startsWith("next-auth.session-token="));
  }

  console.log(cookie);

  // Cookies.get("")

  const registerUser = async ({ name, email, password }) => {
    const { data } = await axios.post(`${process.env.URL}/api/auth/register`, {
      name,
      email,
      password,
    });
    if (data) {
      router.push("/");
    } else {
      toast.error("ERROR!!");
    }

    // if (data?.user) {
    //   toast.success("SignUp Successful!!");
    //   router.push("/");
    //   // setTimeout(() => {

    //   // }, 1500);
    // } else if (!data?.user) {
    //   console.log(response?.data?.message);
    //   setError(response?.data?.message);
    //   toast.error("failed");
    // }
  };
  const addNewAddress = async (newAddress, cookiesToken) => {
    try {
      const { data } = await axios.post(`${process.env.URL}/api/address`, {
        newAddress,
        // headers: {
        //   Cookie: `next-auth.session-token=${cookiesToken?.value}`,
        // },
        // withCredentials: true,
      });

      if (data) {
        router.push("/me");
      }
    } catch (err) {
      console.log(err?.response?.data?.message);

      setError(err?.response?.data?.message);
    }
  };

  const updateAddress = async (id, updatedAddress) => {
    try {
      const { data } = await axios.put(`${process.env.URL}/api/address/${Id}`, {
        updatedAddress,
      });

      if (data) {
        setUpdated(true);
        router.replace(`/address/${id}`);
      }
    } catch (err) {
      console.log(err?.response?.data?.message);

      setError(err?.response?.data?.message);
    }
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        user,
        updated,
        error,
        setUser,
        clearError,
        addNewAddress,
        updateAddress,
        setUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
