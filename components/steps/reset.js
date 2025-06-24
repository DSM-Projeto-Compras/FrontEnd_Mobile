import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import BtnPadrao from "../button";

const Step3NewPassword = ({
  novaSenha,
  setNovaSenha,
  confirmarSenha,
  setConfirmarSenha,
  onSubmit,
  onBack,
  isLoading,
}) => {
  return (
    <View style={styles.stepContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        Nova Senha{"\n"}Defina sua nova senha
      </Text>

      <TextInput
        label="Nova Senha"
        value={novaSenha}
        onChangeText={setNovaSenha}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        label="Confirmar Nova Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        style={styles.input}
      />

      <BtnPadrao
        title={isLoading ? "Redefinindo..." : "Redefinir Senha"}
        onPress={onSubmit}
        btnColor="#AE0F0A"
        textColor="white"
        disabled={isLoading}
      />

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  backButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  backText: {
    color: "#AE0F0A",
    textDecorationLine: "underline",
  },
});

export default Step3NewPassword;
