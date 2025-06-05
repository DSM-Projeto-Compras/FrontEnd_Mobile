import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASEURL } from "@env";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
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

        const adminStatus = data.cargo === "admin";
        await SecureStore.setItemAsync("isAdmin", adminStatus.toString());
        setIsAdmin(adminStatus);
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
    await SecureStore.deleteItemAsync("isAdmin");
    setUserToken(null);
    setIsAdmin(false);
  };

  const loadToken = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    const adminStatus = await SecureStore.getItemAsync("isAdmin");
    setUserToken(token);
    setIsAdmin(adminStatus === "true");
    setIsLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userToken, isAdmin, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
