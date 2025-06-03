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
import BottomNavAdm from "../components/bottomNavAdm";


const RegisterAdmScreen = () => {
  const navigation = useNavigation();

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
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
        />

        <TextInput
          label="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Senha"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          label="Digite a senha novamente"
          secureTextEntry
          style={styles.input}
        />

        <BtnPadrao
          title={"Cadastrar Conta"}
          btnColor="#AE0F0A"
          textColor="white"
        />


      <View style={styles.bottomNavContainer}>
          <BottomNavAdm />
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
