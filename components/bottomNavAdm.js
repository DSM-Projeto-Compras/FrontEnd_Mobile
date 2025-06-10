import * as React from "react";
import { View, StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

const BottomNavAdm = () => {
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();
  const { logout } = useAuth();

  const routes = [
    {
      key: "history",
      title: "Histórico",
      focusedIcon: "history",
    },
    {
      key: "admins",
      title: "Administradores",
      focusedIcon: "clipboard-text-multiple",
      unfocusedIcon: "clipboard-text-multiple-outline",
    },
    { key: "logout", title: "Sair", focusedIcon: "logout" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const getIndexFromRouteName = (routeName) => {
    switch (routeName) {
      case "HistAdm":
        return 0; // history
      case "AdmScreen":
        return 1; // admins
      default:
        return 0;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const currentRoute =
        navigation.getState()?.routes[navigation.getState()?.index];
      if (currentRoute) {
        const newIndex = getIndexFromRouteName(currentRoute.name);
        setIndex(newIndex);
      }
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <BottomNavigation.Bar
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        onTabPress={({ route, preventDefault }) => {
          if (route.key === "history") {
            preventDefault();
            navigation.navigate("HistAdm");
          } else if (route.key === "logout") {
            preventDefault();
            handleLogout();
          } else if (route.key === "admins") {
            preventDefault();
            navigation.navigate("AdmScreen");
          } else {
            const newIndex = routes.findIndex((r) => r.key === route.key);
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
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomNavAdm;
