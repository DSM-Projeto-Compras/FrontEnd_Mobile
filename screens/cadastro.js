import React from "react";
import { KeyboardAvoidingView, View, StyleSheet, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BtnPadrao from "../components/button";

const RegisterScreen =()=>{
    const navigation = useNavigation();
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <Header />
            <View style={styles.content}>
                <Text variant="headlineMedium" style={styles.title}>
                    Crie sua conta
                </Text>

                <TextInput
                    label="Nome"
                    style={styles.input}
                    keyboardType="name" 
                    autoCapitalize="none"
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
                    label="Confirme sua senha"
                    secureTextEntry
                    style={styles.input}
                />

                <BtnPadrao 
                title="Criar Conta"
                onPress={() => {
                  navigation.navigate("Login")
                }}
                btnColor="#AE0F0A"
                textColor="white"
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    fontWeight: 'bold',
    color: 'red'
  }
});

export default RegisterScreen;