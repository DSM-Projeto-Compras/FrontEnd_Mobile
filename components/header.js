import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = ({ leftImage, rightImage }) => {
    return (
        <View style={styles.container}>
            <Image source={leftImage} style={styles.image} resizeMethod="constain" />
            <Image source={rightImage} style={styles.image} resizeMethod="constain" />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: 60,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff', // ou qualquer cor de fundo desejada
      elevation: 4, // para Android
      shadowColor: '#000', // para iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
},
  image: {
    width: 40,
    height: 40,
  },
});

export default Header;