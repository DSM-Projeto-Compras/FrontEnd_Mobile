import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const RequestRoute = () => <Text>Requisições</Text>;

const HistoryRoute = () => <Text>Histórico</Text>;

const LogoutRoute = () => <Text>Sair</Text>;

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