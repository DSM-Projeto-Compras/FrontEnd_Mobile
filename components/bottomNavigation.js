import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();

  const routes = [
    { key: 'request', title: 'Requisição', focusedIcon: 'clipboard-text-multiple', unfocusedIcon: 'clipboard-text-multiple-outline' },
    { key: 'history', title: 'Histórico', focusedIcon: 'history' },
    { key: 'logout', title: 'Sair', focusedIcon: 'logout' },
  ];

  const renderContent = () => {
    const currentKey = routes[index].key;

    if (currentKey === 'history') {
      return (
        <View style={styles.content}>
          <Text>Histórico</Text>
        </View>
      );
    }

    return <View style={styles.content} />; // Nada será renderizado se for request ou logout
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <BottomNavigation.Bar
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === 'request') {
            preventDefault();
            navigation.navigate('Order');
          } else if (route.key === 'logout') {
            preventDefault();
            navigation.navigate('Login');
          } else {
            const newIndex = routes.findIndex(r => r.key === route.key);
            setIndex(newIndex);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNav;
