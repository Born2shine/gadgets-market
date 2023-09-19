"use client";
import { useRouter } from "next/navigation";
import axios from "axios";

const { createContext, useState } = require("react");

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  const updateOrder = async (orderData, id) => {
    const { data } = await axios.put(
      `${process.env.URL}/api/admin/orders/${id}`,
      orderData
    );
    if (data.success) {
      setUpdated(true);
      router.replace(`/admin/orders/${id}`);
    } else {
      setError(response?.data?.message);
    }
  };

  const deleteOrder = async (id) => {
    const { data } = await axios.delete(
      `${process.env.URL}/api/admin/orders/${id}`
    );
    if (data.success) {
      router.replace(`/admin/orders`);
    } else {
      setError(response?.data?.message);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        updated,
        error,
        clearError,
        updateOrder,
        setUpdated,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
