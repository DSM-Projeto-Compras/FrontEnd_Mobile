import React from "react";
import { KeyboardAvoidingView, View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BtnPadrao from "../components/button";
import OrderCard from "../components/card";

const LoginScreen =()=>{
  const navigation = useNavigation();
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <Header />
            <View style={styles.content}>
                <Text variant="headlineMedium" style={styles.title}>
                    Bem Vindo(a)!{'\n'}Inicie sua sessão
                </Text>

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

                <BtnPadrao 
                title="Login"
                onPress={() => {
                  navigation.navigate('Order')
                }}
                btnColor="#AE0F0A"
                textColor="white"
                />

                <View style={styles.registerContainer}>
                  <Text>Não possui conta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
  registerLink: {
    color: 'red',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
});

export default LoginScreen;