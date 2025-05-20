import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Header from './components/header';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex:1 }}>
        <Header />
      </SafeAreaView>
    </PaperProvider>
  );
}

