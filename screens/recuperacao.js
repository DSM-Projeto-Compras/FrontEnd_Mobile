import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import Toast from "../components/toast";
import { useAuth } from "../contexts/AuthContext";
import Step1EmailForm from "../components/steps/forgot";
import Step2CodeVerification from "../components/steps/verify";
import Step3NewPassword from "../components/steps/reset";

const RecuperacaoScreen = () => {
  const navigation = useNavigation();
  const {
    forgotPassword,
    verifyCode,
    resetPassword,
    successMessage,
    errorMessage,
    clearSuccessMessage,
    clearErrorMessage,
  } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  const handleStep1 = async () => {
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

    setIsLoading(true);

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setCurrentStep(2);
      }
    } catch (err) {
      setLocalErrorMessage(
        err.message || "Erro ao enviar email de recuperação"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2 = async () => {
    setLocalErrorMessage("");

    if (!codigo) {
      setLocalErrorMessage("O código de verificação é obrigatório");
      return;
    }

    if (codigo.length !== 6) {
      setLocalErrorMessage("O código deve ter 6 dígitos");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyCode(codigo, email);
      if (result.success) {
        setCurrentStep(3);
      }
    } catch (err) {
      setLocalErrorMessage(err.message || "Código de verificação inválido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep3 = async () => {
    setLocalErrorMessage("");

    if (!novaSenha) {
      setLocalErrorMessage("A nova senha é obrigatória");
      return;
    }

    if (novaSenha.length < 6) {
      setLocalErrorMessage("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (!confirmarSenha) {
      setLocalErrorMessage("A confirmação de senha é obrigatória");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setLocalErrorMessage("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const result = await resetPassword(novaSenha, email, codigo);
      if (result.success) {
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      }
    } catch (err) {
      setLocalErrorMessage(err.message || "Erro ao redefinir senha");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissLocalError = () => {
    setLocalErrorMessage("");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1EmailForm
            email={email}
            setEmail={setEmail}
            onSubmit={handleStep1}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <Step2CodeVerification
            codigo={codigo}
            setCodigo={setCodigo}
            onSubmit={handleStep2}
            onBack={() => setCurrentStep(1)}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <Step3NewPassword
            novaSenha={novaSenha}
            setNovaSenha={setNovaSenha}
            confirmarSenha={confirmarSenha}
            setConfirmarSenha={setConfirmarSenha}
            onSubmit={handleStep3}
            onBack={() => setCurrentStep(2)}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Header />
      <View style={styles.content}>
        {renderCurrentStep()}

        {isLoading && (
          <ActivityIndicator style={styles.loader} color="#AE0F0A" />
        )}

        <View style={styles.loginContainer}>
          <Text>Lembrou da senha? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Fazer Login</Text>
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginLink: {
    color: "red",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
});

export default RecuperacaoScreen;
