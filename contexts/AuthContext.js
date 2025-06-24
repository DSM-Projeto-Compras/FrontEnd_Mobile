import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASEURL } from "@env";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = API_BASEURL + "/logins";

  const login = async (email, senha) => {
    try {
      const response = await fetch(`${apiUrl}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(
          `Resposta inválida do servidor: ${response.status} - ${text}`
        );
      }

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
      const response = await fetch(`${apiUrl}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.status === 201) {
        return { success: true };
      }

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Erro no servidor: ${response.status} - ${text}`);
      }

      throw new Error(data.message || "Erro no cadastro");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${apiUrl}/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Erro no servidor: ${response.status} - ${text}`);
      }

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Erro ao enviar email de recuperação");
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      throw error;
    }
  };

  const verifyCode = async (codigo, email) => {
    try {
      const response = await fetch(`${apiUrl}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, email }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Erro no servidor: ${response.status} - ${text}`);
      }

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Código de verificação inválido");
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      throw error;
    }
  };

  const resetPassword = async (novaSenha, email, codigo) => {
    try {
      const response = await fetch(`${apiUrl}/reset`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ novaSenha, email, codigo }),
      });

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Erro no servidor: ${response.status} - ${text}`);
      }

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Erro ao redefinir senha");
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
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
      value={{
        userToken,
        isAdmin,
        login,
        register,
        logout,
        isLoading,
        forgotPassword,
        verifyCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
