import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const RequestRoute = () =>{
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.navigate('Order');
  }, [navigation]);

  return null;
};

const HistoryRoute = () => <Text>Histórico</Text>;

const LogoutRoute = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return null;
};   

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'request', title: 'Requisição', focusedIcon: 'clipboard-text-multiple', unfocusedIcon: 'clipboard-text-multiple-outline'},
    { key: 'history', title: 'Histórico', focusedIcon: 'history' },
    { key: 'logout', title: 'Sair', focusedIcon: 'logout' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    request: RequestRoute,
    history: HistoryRoute,
    logout: LogoutRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;