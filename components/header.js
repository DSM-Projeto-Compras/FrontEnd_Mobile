import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';


const Header = () => {

  return (
    <Appbar.Header style={styles.header}>
      <Image
        source={require('../assets/fatec.png')}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={{ flex: 1 }} />

      <Image
        source={require('../assets/cps.png')} 
        style={styles.image}
        resizeMode="stretch"
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
    width: 150,
    height: 90,
    marginHorizontal: 8,
  },
});

export default Header;
