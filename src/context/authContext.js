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
    try {
      const { data } = await axios.post(
        `${process.env.URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      if (data) {
        toast.success("SignUp Successful!!");
        router.push("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const loadUser = async () => {
    setLoading(true);

    const { data } = await axios.get("/api/auth/session?update");
    if (data) {
      setUser(data.user);
      setLoading(false);
      router.replace("/me");
    } else {
      setError(response?.data?.message);
    }
  };

  const updateUser = async (formData) => {
    setLoading(true);
    console.log([...formData.entries()]);
    const { data } = await axios.put(
      `${process.env.URL}/api/auth/me/update`,
      formData
      // {
      //   headers: {
      //     "content-Type": "multipart/form-data",
      //   },
      // }
    );
    if (data) {
      toast.success("update Successful!!");
      console.log(data);
      setLoading(false);
      loadUser();
    } else {
      setLoading(false);
      setError(response?.data?.message);
    }
  };

  const updatePassword = async ({ newPassword, currentPassword }) => {
    const { data } = await axios.put(
      `${process.env.URL}/api/auth/me/update_password`,
      { newPassword, currentPassword }
    );
    if (data.success) {
      toast.success("update Successful!!");
      router.replace("/me");
    } else {
      setError(response?.data?.message);
    }
  };

  const adminUpdateUser = async (userData, id) => {
    const { data } = await axios.put(
      `${process.env.URL}/api/admin/users/${id}`,
      userData
    );
    if (data?.success) {
      setUpdated(true);
      router.replace("/admin/users");
    } else {
      setError(response?.data?.message);
    }
  };

  const adminDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.URL}/api/admin/users/${id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        router.push("/admin/users");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (newAddress) => {
    try {
      const { data } = await axios.post(`${process.env.URL}/api/address`, {
        newAddress,
      });

      if (data) {
        router.push("/me");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
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
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.URL}/api/address/${id}`
      );

      if (data) {
        router.push(`/me`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearError = () => {
    setError(null);
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
        updatePassword,
        setUpdated,
        deleteAddress,
        adminDeleteUser,
        adminUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
