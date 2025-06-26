import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { API_BASEURL } from "@env";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
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

        setSuccessMessage("Login realizado com sucesso!");
      } else {
        throw new Error("Token não encontrado na resposta");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Erro ao fazer login. Verifique suas credenciais.");
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
        setSuccessMessage("Cadastro realizado com sucesso!");
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
      setErrorMessage("Erro ao realizar cadastro. Tente novamente.");
      throw error;
    }
  };

  const registerAdmin = async (nome, email, senha) => {
    try {
      const response = await fetch(`${apiUrl}/cadastro-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": userToken,
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.status === 201) {
        setSuccessMessage("Administrador cadastrado com sucesso!");
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

      throw new Error(data.message || "Erro no cadastro do administrador");
    } catch (error) {
      console.error("Erro no cadastro do administrador:", error);
      setErrorMessage("Erro ao cadastrar administrador. Tente novamente.");
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
        setSuccessMessage("Email de recuperação enviado com sucesso!");
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Erro ao enviar email de recuperação");
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      setErrorMessage("Erro ao enviar email de recuperação.");
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
        setSuccessMessage("Código verificado com sucesso!");
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Código de verificação inválido");
      }
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      setErrorMessage("Código de verificação inválido.");
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
        setSuccessMessage("Senha redefinida com sucesso!");
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Erro ao redefinir senha");
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setErrorMessage("Erro ao redefinir senha.");
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("isAdmin");
    setUserToken(null);
    setIsAdmin(false);
  };

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const setErrorMessageExternal = (message) => {
    setErrorMessage(message);
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
        registerAdmin,
        logout,
        isLoading,
        forgotPassword,
        verifyCode,
        resetPassword,
        successMessage,
        errorMessage,
        clearSuccessMessage,
        clearErrorMessage,
        setErrorMessage: setErrorMessageExternal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
