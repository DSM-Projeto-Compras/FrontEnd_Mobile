import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BtnPadrao from "../components/button";
import Toast from "../components/toast";
import { useAuth } from "../contexts/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    login,
    userToken,
    isAdmin,
    successMessage,
    errorMessage,
    clearSuccessMessage,
    clearErrorMessage,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  const handleLogin = async () => {
    setLocalErrorMessage("");

    if (!email) {
      setLocalErrorMessage("O email é obrigatório");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalErrorMessage("O email informado não é válido");
      return;
    }

    if (!senha) {
      setLocalErrorMessage("A senha é obrigatória");
      return;
    }

    if (senha.length < 6) {
      setLocalErrorMessage("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, senha);
    } catch (err) {
      setLocalErrorMessage(
        "Credenciais inválidas. Verifique seu email e senha."
      );
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissLocalError = () => {
    setLocalErrorMessage("");
  };

  useEffect(() => {
    if (userToken) {
      if (isAdmin) {
        navigation.navigate("HistAdm");
      } else {
        navigation.navigate("Order");
      }
    }
  }, [userToken, isAdmin, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Header />
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Bem Vindo(a)!{"\n"}Inicie sua sessão
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />

        <BtnPadrao
          title={isLoading ? "Entrando..." : "Login"}
          onPress={handleLogin}
          btnColor="#AE0F0A"
          textColor="white"
          disabled={isLoading}
        />

        {isLoading && (
          <ActivityIndicator style={styles.loader} color="#AE0F0A" />
        )}

        <View style={styles.registerContainer}>
          <Text>Não possui conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text>Esqueceu sua senha? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Recuperacao")}>
            <Text style={styles.registerLink}>Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Toast
        login
        successMessage={successMessage}
        errorMessage={errorMessage || localErrorMessage}
        onDismissSuccess={clearSuccessMessage}
        onDismissError={
          errorMessage ? clearErrorMessage : handleDismissLocalError
        }
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerLink: {
    color: "red",
    fontWeight: "bold",
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  loader: {
    marginTop: 10,
  },
  forgotContainer: {
    justifyContent: "center",
    marginTop: 12,
    alignItems: "center",
  },
  forgotLink: {
    color: "#AE0F0A",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
