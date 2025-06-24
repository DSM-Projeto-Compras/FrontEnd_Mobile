import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text } from "react-native-paper";
import BtnPadrao from "../button";

const Step1EmailForm = ({ email, setEmail, onSubmit, isLoading }) => {
  return (
    <View style={styles.stepContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        Recuperar Senha{"\n"}Informe seu email
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <BtnPadrao
        title={isLoading ? "Enviando..." : "Enviar Código"}
        onPress={onSubmit}
        btnColor="#AE0F0A"
        textColor="white"
        disabled={isLoading}
      />
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
});

export default Step1EmailForm;
