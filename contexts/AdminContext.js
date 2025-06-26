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
  const [allAdmins, setAllAdmins] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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

  const getAllAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/logins/`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar todos os administradores");
      }

      const data = await response.json();

      const adminsArray = Array.isArray(data) ? data : [];

      setAllAdmins(adminsArray);
      return data;
    } catch (err) {
      console.error("Erro ao buscar admins:", err);
      setError(err.message);
      setErrorMessage("Erro ao carregar administradores");
      setAllAdmins([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async (adminId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASEURL}/logins/usuario/${adminId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao deletar administrador";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error("Erro ao fazer parse da resposta:", parseError);
        }
        throw new Error(errorMessage);
      }

      await getAllAdmins();
      setSuccessMessage("Administrador removido com sucesso!");
    } catch (err) {
      console.error("Erro ao deletar admin:", err);
      const errorMsg =
        err.message || "Erro desconhecido ao deletar administrador";
      setError(errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASEURL}/logins/me`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuário atual");
      }

      const data = await response.json();
      setCurrentUser(data);
      return data;
    } catch (err) {
      console.error("Erro ao buscar usuário atual:", err);
      return null;
    }
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setError(null);
  };

  const refreshAdminsList = async () => {
    await getAllAdmins();
  };

  useEffect(() => {
    if (userToken && isAdmin) {
      getAllProducts();
      getCurrentUser();
    }
  }, [userToken, isAdmin]);

  const value = {
    allProducts,
    allAdmins,
    currentUser,
    loading,
    error,
    successMessage,
    errorMessage,
    getAllProducts,
    approveProduct,
    getAllAdmins,
    deleteAdmin,
    getCurrentUser,
    refreshAdminsList,
    setError,
    clearMessages,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
