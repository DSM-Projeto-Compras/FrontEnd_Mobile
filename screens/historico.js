import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import OrderCard from "../components/card"

const HistScreen =()=>{ 
    return(
        <View style={styles.pageContainer}>
             <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text variant="headlineMedium" style={styles.title}>
                  Histórico
                </Text>
                 <Header /> 
                 <OrderCard 
                 itemName={'Caneta'}
                 quantity={4}
                 orderDate={'10/04/2025'}
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
