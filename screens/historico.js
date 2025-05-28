import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import OrderCard from "../components/card"

const HistScreen =()=>{ 
  return(
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <Text variant="headlineMedium" style={styles.title}>
          Histórico
        </Text> 
        <OrderCard 
          itemName={'Caneta'}
          quantity={4}
          orderDate={'10/04/2025'}
        />
        <OrderCard 
          itemName={'Caixa de Giz de Cera'}
          quantity={2}
          orderDate={'18/02/2025'}
        />
        <OrderCard 
          itemName={'Pacote de Pregos'}
          quantity={1}
          orderDate={'04/05/2025'}
        />
        <OrderCard 
          itemName={'Chapa de MDF 15mm'}
          quantity={15}
          orderDate={'28/02/2025'}
        />
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
  title: {
    marginBottom: 32,
    textAlign: "center",
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

export default HistScreen;
