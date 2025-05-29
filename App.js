import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/cadastro";
import OrderScreen from "./screens/pedido";
import HistScreen from "./screens/historico";
import HistAdmScreen from "./screens/historicoAdm";
import RegisterAdmScreen from "./screens/cadastroAdm";
import AdmScreen from "./screens/excluirAdm";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/AuthContext";
import { PaperProvider } from "react-native-paper";
import customTheme from "./tema";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Order"
              component={OrderScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Hist"
              component={HistScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HistAdm"
              component={HistAdmScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AdmScreen"
              component={AdmScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterAdm"
              component={RegisterAdmScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
