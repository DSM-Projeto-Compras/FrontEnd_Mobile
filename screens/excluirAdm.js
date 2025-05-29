import react, {useState} from "react";
import { TextInput, Button, Text, List } from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import BtnPadrao from "../components/button";

const AdmScreen =()=>{
    return(
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <Text variant="headlineMedium" style={styles.title}>
          Faça a requisição do produto desejado
        </Text>

        <View style={styles.formContainer}>

          <BtnPadrao
            title="Cadastrar Administrador"
            btnColor="#AE0F0A"
            textColor="white"
          />
        </View>
      </ScrollView>
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  formContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AdmScreen;