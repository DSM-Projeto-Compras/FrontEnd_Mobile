import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './components/header';

export default function App() {
  return (
    <Header 
      leftImage={require('./assets/icon.png')}
      rightImage={require('./assets/favicon.png')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
