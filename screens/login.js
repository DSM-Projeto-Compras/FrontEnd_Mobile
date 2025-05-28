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
import OrderCard from "../components/card";
import { useAuth } from "../contexts/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, userToken } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

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

    setIsLoading(true);

    try {
      await login(email, senha);
    } catch (err) {
      setError("Credenciais inválidas. Verifique seu email e senha.");
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      navigation.navigate("Order");
    }
  }, [userToken, navigation]);

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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

        {/* itemName, quantity, orderDate, status = "Pendente" */}
                <OrderCard 
                itemName={"Impressora 3D"}
                quantity={2}
                orderDate={"22/05/2025"}
                />
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
  errorText: {
    color: "#AE0F0A",
    textAlign: "center",
    marginBottom: 10,
  },
  loader: {
    marginTop: 10,
  },
});

export default LoginScreen;
