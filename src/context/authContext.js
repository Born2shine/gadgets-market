"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      console.log(data?.user);
      if (data?.user) {
        toast.success("SignUp Successful!!");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      console.log(err?.response?.data?.message);

      setError(err?.response?.data?.message);
    }
  };
  const addNewAddress = async (newAddress) => {
    console.log(newAddress);
    try {
      const { data } = await axios.post(`${process.env.URL}/api/address`, {
        newAddress,
      });

      console.log(data);

      if (data) {
        router.push("/me");
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
        error,
        setUser,
        clearError,
        addNewAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
