import react, {useState} from "react";
import { TextInput, Button, Text, List } from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BottomNavAdm from "../components/bottomNavAdm";
import BtnPadrao from "../components/button";
import EmailCard from "../components/cardAdmin";

const AdmScreen =()=>{
  const navigation = useNavigation();
    return(
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <Text variant="headlineMedium" style={styles.title}>
          Administradores
        </Text>

        <EmailCard
          name="Eduardo Brando Almeida"
          email="eduardo@email.com"
          onDelete={() => console.log('Deletar')}
        />

        <EmailCard
          name="Paulo César Apaecido Quezada e Vasconcelos Victório"
          email="paulao@email.com"
          onDelete={() => console.log('Deletar')}
        />

        <View style={styles.formContainer}>

        <BtnPadrao
          title={'Cadastrar'}
          onPress={() => navigation.navigate("RegisterAdm")}
          btnColor="#AE0F0A"
          textColor="white"
        />
        </View>
      </ScrollView>
      <View style={styles.bottomNavContainer}>
        <BottomNavAdm />
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