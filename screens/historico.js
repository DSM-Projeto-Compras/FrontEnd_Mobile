import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import BtnPadrao from "../components/button";

const HistScreen =()=>{ 
    return(
        <View style={styles.pageContainer}>
             <ScrollView contentContainerStyle={styles.scrollContent}>
                 <Header /> 
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

export default HistScreen;
