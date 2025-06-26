import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { TextInput, Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BtnPadrao from "../components/button";
import Toast from "../components/toast";
import { useAuth } from "../contexts/AuthContext";

const RegisterAdmScreen = () => {
  const navigation = useNavigation();
  const {
    registerAdmin,
    successMessage,
    errorMessage,
    clearSuccessMessage,
    clearErrorMessage,
    setErrorMessage,
  } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      setErrorMessage("Todos os campos são obrigatórios");
      return;
    }

    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await registerAdmin(nome, email, senha);
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar administrador:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Header />
      <IconButton
        icon="arrow-left"
        size={36}
        iconColor="#AE0F0A"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            Cadastre o novo administrador
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#AE0F0A" />
            </View>
          ) : (
            <>
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
                label="Digite a senha novamente"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                style={styles.input}
              />

              <BtnPadrao
                title={"Cadastrar Conta"}
                onPress={handleCadastro}
                btnColor="#AE0F0A"
                textColor="white"
              />
            </>
          )}
        </View>
      </ScrollView>

      <Toast
        successMessage={successMessage}
        errorMessage={errorMessage}
        onDismissSuccess={clearSuccessMessage}
        onDismissError={clearErrorMessage}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 100,
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
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
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
});

export default RegisterAdmScreen;
