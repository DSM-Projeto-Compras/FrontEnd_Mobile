import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BtnPadrao from "../components/button";
import Toast from "../components/toast";
import { useAuth } from "../contexts/AuthContext";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    register,
    userToken,
    successMessage,
    errorMessage,
    clearSuccessMessage,
    clearErrorMessage,
  } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Order");
    }
  }, [userToken, navigation]);

  const handleRegister = async () => {
    setLocalErrorMessage("");

    if (!nome) {
      setLocalErrorMessage("O nome é obrigatório");
      return;
    }

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

    if (senha !== confirmSenha) {
      setLocalErrorMessage("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(nome, email, senha);

      if (result.success) {
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      }
    } catch (err) {
      if (err.message.includes("409")) {
        setLocalErrorMessage("O email informado já está cadastrado");
      } else {
        setLocalErrorMessage("Falha no cadastro. Tente novamente.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissLocalError = () => {
    setLocalErrorMessage("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Header />
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Crie sua conta
        </Text>

        <TextInput
          label="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
        />

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

        <TextInput
          label="Confirme sua senha"
          value={confirmSenha}
          onChangeText={setConfirmSenha}
          secureTextEntry
          style={styles.input}
        />

        <BtnPadrao
          title={isLoading ? "Criando..." : "Criar Conta"}
          onPress={handleRegister}
          btnColor="#AE0F0A"
          textColor="white"
          disabled={isLoading}
        />

        {isLoading && (
          <ActivityIndicator style={styles.loader} color="#AE0F0A" />
        )}

        <View style={styles.loginLinkContainer}>
          <Text>Já possui conta? </Text>
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            Entrar
          </Text>
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
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginLink: {
    color: "#AE0F0A",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
});

export default RegisterScreen;
