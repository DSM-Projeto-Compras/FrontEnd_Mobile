import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASEURL } from "@env";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, senha) => {
    try {
      const response = await fetch(`${API_BASEURL}/logins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (data.access_token) {
        await SecureStore.setItemAsync("userToken", data.access_token);
        setUserToken(data.access_token);
      } else {
        throw new Error("Token não encontrado na resposta");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const register = async (nome, email, senha) => {
    try {
      const response = await fetch(`${API_BASEURL}/logins/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.status === 201) {
        return { success: true };
      }

      const data = await response.json();
      throw new Error(data.message || "Erro no cadastro");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUserToken(null);
  };

  const loadToken = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    setUserToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userToken, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
