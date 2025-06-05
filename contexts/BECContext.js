import React, { createContext, useContext, useState } from "react";

const BECContext = createContext();

const BASE_URL = "https://www.bec.sp.gov.br/BEC_Catalogo_ui";

export const BECProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async (prefixText, count = 20) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/WebService/AutoComplete.asmx/GetItensList`;
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({ prefixText, count });

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos.");
      }

      const data = await response.json();
      setProducts(data.d || []);
      return data.d;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setError(error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const searchProduct = async (description) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/CatalogoPesquisa3.aspx?chave=&pesquisa=Y&cod_id=&ds_item=${encodeURIComponent(
        description
      )}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar o produto.");
      }

      const data = await response.text();

      try {
        const regex =
          /id="ContentPlaceHolder1_gvResultadoPesquisa_lbTituloItem_0"[^>]*>(.*?)<\/a>/i;
        const match = data.match(regex);

        if (match && match[1]) {
          const productId = match[1].trim().split(" ")[0];
          return productId;
        }
      } catch (parseError) {
        console.error("Erro ao analisar ID do produto:", parseError);
      }

      return data;
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
      setError(error.message);
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  const getProductDetails = async (cod_id) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}/CatalogDetalheNovo.aspx?chave=&cod_id=${encodeURIComponent(
        cod_id
      )}&selo=&origem=CatalogoPesquisa3`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erro ao obter detalhes do produto.");
      }

      const data = await response.text();
      setProductDetails(data);
      return data;
    } catch (error) {
      console.error("Erro ao obter detalhes do produto:", error);
      setError(error.message);
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  const clearProducts = () => {
    setProducts([]);
    setProductDetails(null);
  };

  return (
    <BECContext.Provider
      value={{
        products,
        productDetails,
        isLoading,
        error,
        getProducts,
        searchProduct,
        getProductDetails,
        clearProducts,
      }}
    >
      {children}
    </BECContext.Provider>
  );
};

export const useProducts = () => useContext(BECContext);
