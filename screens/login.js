import React from "react";
import { KeyboardAvoidingView, View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Header from "./header";

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

                <Button 
                    mode="contained"
                    style={styles.button}
                    buttonColor='#AE0F0A'
                    textColor="white"
                >
                    Login
                </Button>

                <View style={styles.registerContainer}>
                  <Text>Não possui conta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
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