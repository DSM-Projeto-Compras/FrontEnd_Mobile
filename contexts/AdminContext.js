import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { API_BASEURL } from "@env";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin deve ser usado dentro de um AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userToken, isAdmin } = useAuth();

  const getAuthHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (userToken) {
      headers["access-token"] = userToken;
    }
    return headers;
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/products/all`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar todos os produtos");
      }
      const data = await response.json();
      setAllProducts(data);
      return data;
    } catch (err) {
      setError(err.message);
      setErrorMessage("Erro ao carregar produtos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveProduct = async (id, status, justificativa = null) => {
    try {
      setLoading(true);
      setError(null);

      const body = { status };
      if (justificativa) {
        body.justificativa = justificativa;
      }

      const response = await fetch(`${API_BASEURL}/products/aprove/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar aprovação do produto");
      }

      const data = await response.json();

      await getAllProducts();

      const statusText = status === "Aprovado" ? "aprovada" : "negada";
      setSuccessMessage(`Requisição ${statusText} com sucesso!`);

      return data;
    } catch (err) {
      setError(err.message);
      setErrorMessage("Erro ao processar aprovação do produto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (userToken && isAdmin) {
      getAllProducts();
    }
  }, [userToken, isAdmin]);

  const value = {
    allProducts,
    loading,
    error,
    successMessage,
    errorMessage,
    getAllProducts,
    approveProduct,
    setError,
    clearMessages,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
