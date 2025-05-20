import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = () => {
  return (
    <Appbar.Header style={styles.header}>
      {/* Imagem à esquerda */}
      <Image
        source={require('../assets/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Espaço central vazio para empurrar as imagens para as extremidades */}
      <View style={{ flex: 1 }} />

      {/* Imagem à direita */}
      <Image
        source={require('../assets/favicon.png')} 
        style={styles.image}
        resizeMode="contain"
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    elevation: 4,
  },
  image: {
    width: 32,
    height: 32,
    marginHorizontal: 8,
  },
});

export default Header;
