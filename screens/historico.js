import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import BtnPadrao from "../components/button";

const HistScreen =()=>{ 
    return(
        <View>
                <ScrollView>
                    <Header />
                </ScrollView>
            <View style={styles.bottomNavContainer}>
                <BottomNav />
            </View>
        </View>
    )
}

export default HistScreen;
