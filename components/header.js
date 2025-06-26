import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Appbar } from "react-native-paper";

const Header = () => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.container}>
        <View style={styles.spacer} />

        <Image
          source={require("../assets/fatec.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.spacer} />

        <Image
          source={require("../assets/cps.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.spacer} />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 2,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacer: {
    flex: 1,
  },
  image: {
    height: 70,
  },
});

export default Header;
