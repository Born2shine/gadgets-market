"use client";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(null);
  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    const { data } = await axios.post(`${process.env.URL}/api/auth/register`, {
      name,
      email,
      password,
    });
    if (data) {
      toast.success("SignUp Successful!!");
      router.push("/");
    } else {
      toast.error("ERROR!!");
      setError(response?.data?.message);
    }
  };

  const loadUser = async () => {
    setLoading(true);

    const { data } = await axios.get("/api/auth/session?update");
    if (data) {
      // console.log(data);
      setUser(data.user);
      setLoading(false);
      router.replace("/me");
    } else {
      setError(response?.data?.message);
    }
  };

  const updateUser = async (formData) => {
    setLoading(true);
    const { data } = await axios.put(
      `${process.env.URL}/api/auth/me/update`,
      formData,
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
    if (data) {
      toast.success("update Successful!!");
      console.log(data);
      setLoading(false);
      loadUser();
    } else {
      toast.error("ERROR!!");
      setLoading(false);
      console.log(response?.data);
      setError(response?.data?.message);
    }
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
      const { data } = await axios.put(`${process.env.URL}/api/address/${id}`, {
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

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.URL}/api/address/${id}`
      );

      if (data) {
        router.push(`/me`);
      }
    } catch (err) {
      console.log(err?.response?.data?.message);

      setError(err?.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loading,
        user,
        updated,
        error,
        setUser,
        updateUser,
        clearError,
        addNewAddress,
        updateAddress,
        setUpdated,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
