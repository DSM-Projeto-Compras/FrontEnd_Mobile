import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { API_BASEURL } from "@env";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userToken } = useAuth();

  const getAuthHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (userToken) {
      headers["access-token"] = userToken;
    }
    return headers;
  };

  // Buscar todos os produtos
  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/products`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProducts(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/products/${id}`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar produto");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      setErrorMessage(null);

      const response = await fetch(`${API_BASEURL}/products`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erro ${response.status}: ${errorData}`);
      }

      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      setSuccessMessage("Requisição criada com sucesso!");
      return newProduct;
    } catch (err) {
      setError(err.message);
      setErrorMessage("Erro ao criar requisição. Tente novamente.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      setError(null);
      setErrorMessage(null);

      const backendData = {
        _id: id,
        nome: productData.itemName || productData.nome,
        tipo: productData.productType || productData.tipo,
        quantidade: parseInt(productData.quantity) || productData.quantidade,
        categoria: productData.category || productData.categoria,
        descricao: productData.description || productData.descricao,
        ...(productData.status && { status: productData.status }),
        ...(productData.justificativa && {
          justificativa: productData.justificativa,
        }),
      };

      const response = await fetch(`${API_BASEURL}/products`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar requisição: ${errorText}`);
      }

      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id || product.id === id ? updatedProduct : product
        )
      );
      setSuccessMessage("Rrequisição atualizada com sucesso!");
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      setErrorMessage("Erro ao atualizar requisição. Tente novamente.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setErrorMessage(null);

      const response = await fetch(`${API_BASEURL}/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao deletar requisição: ${errorText}`);
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== id && product.id !== id)
      );
      setSuccessMessage("Requisição excluída com sucesso!");
      return true;
    } catch (err) {
      setError(err.message);
      setErrorMessage("Erro ao excluir requisição. Tente novamente.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    if (userToken) {
      getProducts();
    }
  }, [userToken]);

  const value = {
    products,
    loading,
    error,
    successMessage,
    errorMessage,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    setError,
    clearSuccessMessage,
    clearErrorMessage,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
