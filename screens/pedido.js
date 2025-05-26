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
        <ScrollView>
            <Header />

            <Text variant="headlineMedium" style={styles.title}>
                    Faça a requisição do produto desejado
            </Text>

            <View style={styles.container}>
                <TextInput 
                    label="Nome do Produto"
                    style={styles.input}
                    autoCapitalize="none"
                />

                <List.Section>
                    <List.Accordion title={ selectedValue == null ? 'Categoria' : selectedValue }
                        expanded={expanded}
                        onPress={handleAccordionPress}>
                        <List.Item title="Caneta" onPress={()=>{handleItemPress("Caneta")}} />
                        <List.Item title="Borracha" onPress={()=>{handleItemPress("Borracha")}} />
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
                // onPress={() => {
                //   navigation.navigate('Order')
                // }}
                btnColor="#AE0F0A"
                textColor="white"
                />
                
              <BottomNav />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  registerLink: {
    color: 'red',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
});

export default OrderScreen;