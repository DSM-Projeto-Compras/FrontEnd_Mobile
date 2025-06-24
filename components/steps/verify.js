import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import BtnPadrao from "../button";

const Step2CodeVerification = ({
  codigo,
  setCodigo,
  onSubmit,
  onBack,
  isLoading,
}) => {
  return (
    <View style={styles.stepContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        Verificação{"\n"}Digite o código recebido
      </Text>

      <TextInput
        label="Código de Verificação"
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        textAlign="center"
      />

      <BtnPadrao
        title={isLoading ? "Verificando..." : "Verificar Código"}
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

export default Step2CodeVerification;
