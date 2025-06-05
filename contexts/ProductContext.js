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

  // Buscar produto por ID
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

  // Criar novo produto
  const createProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/products`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar produto");
      }
      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Atualizar produto
  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/products/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }
      const updatedProduct = await response.json();
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Deletar produto
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASEURL}/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar produto");
      }
      setProducts((prev) => prev.filter((product) => product.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Carregar produtos na inicialização quando userToken estiver disponível
  useEffect(() => {
    if (userToken) {
      getProducts();
    }
  }, [userToken]);

  const value = {
    products,
    loading,
    error,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    setError,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
