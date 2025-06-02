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
import { useAuth } from "../contexts/AuthContext";

const RegisterAdmScreen = () => {
  const navigation = useNavigation();
  const { register, userToken } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Order");
    }
  }, [userToken, navigation]);

  const handleRegister = async () => {
    setError("");
    let hasError = false;

    if (!nome) {
      setError("O nome é obrigatório");
      return;
    }

    if (!email) {
      setError("O email é obrigatório");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("O email informado não é válido");
      return;
    }

    if (!senha) {
      setError("A senha é obrigatória");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (senha !== confirmSenha) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(nome, email, senha);

      if (result.success) {
        alert("Cadastro realizado com sucesso! Por favor, faça login.");
        navigation.navigate("Login");
      }
    } catch (err) {
      if (err.message.includes("409")) {
        setError("O email informado já está cadastrado");
      } else {
        setError("Falha no cadastro. Tente novamente.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Header />
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Cadastre o novo adiministrador
        </Text>

        <TextInput
          label="Nome"
          value={nome}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
        />

        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Senha"
          value={senha}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          label="Digite a senha novamente"
          value={confirmSenha}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <BtnPadrao
          title={isLoading ? "Cadastrando..." : "Cadastrar Conta"}
          btnColor="#AE0F0A"
          textColor="white"
          disabled={isLoading}
        />

        {isLoading && (
          <ActivityIndicator style={styles.loader} color="#AE0F0A" />
        )}

      </View>
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
  errorText: {
    color: "#AE0F0A",
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    marginTop: 10,
  },
});

export default RegisterAdmScreen;
