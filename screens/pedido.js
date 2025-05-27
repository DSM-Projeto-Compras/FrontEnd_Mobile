import react, {useState} from "react";
import { TextInput, Button, Text, List } from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import BtnPadrao from "../components/button";

const OrderScreen =()=>{
    const navigation = useNavigation();

    const [expanded, setExpanded] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleAccordionPress = () => setExpanded(!expanded);
    const handleItemPress = (x)=>{
    setSelectedValue(x);
    setExpanded(false);
  }
    return(
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <Text variant="headlineMedium" style={styles.title}>
          Faça a requisição do produto desejado
        </Text>

        <View style={styles.formContainer}>
          <TextInput
            label="Nome do Produto"
            style={styles.input}
            autoCapitalize="none"
          />

          <List.Section>
            <List.Accordion
              title={selectedValue == null ? "Categoria" : selectedValue}
              expanded={expanded}
              onPress={handleAccordionPress}
            >
              <List.Item title="Caneta" onPress={() => handleItemPress("Caneta")} />
              <List.Item title="Borracha" onPress={() => handleItemPress("Borracha")} />
            </List.Accordion>
          </List.Section>

          <TextInput
            label="Digite a Quantidade"
            style={styles.input}
            keyboardType="numeric"
          />

          <TextInput
            label="Descrição"
            style={styles.input}
            autoCapitalize="none"
          />

          <BtnPadrao
            title="Register"
            btnColor="#AE0F0A"
            textColor="white"
          />
        </View>
      </ScrollView>
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  formContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default OrderScreen;