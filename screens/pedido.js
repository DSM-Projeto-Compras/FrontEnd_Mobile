import react, { useState, useEffect } from "react";
import { TextInput, Text, List, Surface } from "react-native-paper";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import BtnPadrao from "../components/button";
import { useProducts } from "../contexts/ProductContext";

const OrderScreen = () => {
  const navigation = useNavigation();
  const {
    products,
    productDetails,
    isLoading,
    error,
    getProducts,
    searchProduct,
    getProductDetails,
    clearProducts,
  } = useProducts();

  const [expanded, setExpanded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [productName, setProductName] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    clearProducts();
    return () => {
      clearProducts();
    };
  }, []);

  const handleAccordionPress = () => setExpanded(!expanded);

  const handleItemPress = (x) => {
    setSelectedValue(x);
    setExpanded(false);
  };

  const handleProductSearch = (text) => {
    setProductName(text);
    setIsSuggestionSelected(false);

    setProductInfo(null);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (text.length > 2) {
      const newTimeout = setTimeout(() => {
        getProducts(text);
      }, 1000);

      setTypingTimeout(newTimeout);
    } else {
      clearProducts();
    }
  };

  const handleSuggestionPress = async (suggestion) => {
    clearProducts();
    setProductName(suggestion);
    setIsSuggestionSelected(true);

    try {
      const cod_id = await searchProduct(suggestion);

      if (cod_id) {
        const detailsResponse = await getProductDetails(cod_id);

        const classeMatch = detailsResponse.match(
          /id="ContentPlaceHolder1_lbClasseInfo"[^>]*>(.*?)<\/span>/i
        );
        const materialMatch = detailsResponse.match(
          /id="ContentPlaceHolder1_lbMaterialInfo"[^>]*>(.*?)<\/span>/i
        );
        const elementoDespesaMatch = detailsResponse.match(
          /id="ContentPlaceHolder1_lbNElementoDespesaInfo"[^>]*>(.*?)<\/span>/i
        );
        const naturezaDespesaMatch = detailsResponse.match(
          /id="ContentPlaceHolder1_lbNdInfo"[^>]*>(.*?)<\/span>/i
        );

        let classe =
          classeMatch && classeMatch[1]
            ? classeMatch[1].trim()
            : "Não disponível";
        classe = classe.split(" ").slice(2).join(" ");

        let material =
          materialMatch && materialMatch[1]
            ? materialMatch[1].trim()
            : "Não disponível";
        material = material.split(" ").slice(2).join(" ");

        let elementoDespesa =
          elementoDespesaMatch && elementoDespesaMatch[1]
            ? elementoDespesaMatch[1].trim().split(" ")[0]
            : "Não disponível";

        let naturezaDespesa = "Não disponível";
        if (naturezaDespesaMatch && naturezaDespesaMatch[1]) {
          naturezaDespesa = naturezaDespesaMatch[1]
            .replace(/<br\s*\/?>.+<br\s*\/?>/gi, "")
            .replace(/<br\s*\/?>/gi, "")
            .trim();

          if (naturezaDespesa) {
            naturezaDespesa = naturezaDespesa.split(" ")[0];
          } else {
            naturezaDespesa = "Não disponível";
          }
        }

        setProductInfo({
          classe,
          material,
          elementoDespesa,
          naturezaDespesa,
        });
      }
    } catch (err) {
      console.error("Erro ao buscar detalhes do produto:", err);
      setErrorMessage("Falha ao obter detalhes do produto");
    }
  };

  const handleSubmit = () => {
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!isSuggestionSelected) {
      setErrorMessage("Por favor, selecione uma sugestão de produto.");
      return;
    }

    if (!productName || !quantidade || !selectedValue) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    setSuccessMessage("Produto solicitado com sucesso!");

    setProductName("");
    setQuantidade("");
    setDescricao("");
    setSelectedValue(null);
    setProductInfo(null);
    setIsSuggestionSelected(false);
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <Header />

        <View style={styles.formWrapper}>
          <Text variant="headlineMedium" style={styles.title}>
            Faça a requisição do produto desejado
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                label="Nome do Produto* (selecione uma sugestão)"
                style={styles.input}
                autoCapitalize="none"
                value={productName}
                onChangeText={handleProductSearch}
              />

              {products.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {products.slice(0, 5).map((item, index) => (
                    <TouchableOpacity
                      key={index.toString()}
                      style={styles.suggestionItem}
                      onPress={() => handleSuggestionPress(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {isLoading && <Text style={styles.loadingText}>Carregando...</Text>}

            {productInfo && (
              <Surface style={styles.productInfo}>
                <Text style={styles.infoTitle}>Informações do produto</Text>
                <Text>
                  <Text style={styles.infoLabel}>Classe:</Text>{" "}
                  {productInfo.classe}
                </Text>
                <Text>
                  <Text style={styles.infoLabel}>Material:</Text>{" "}
                  {productInfo.material}
                </Text>
                <Text>
                  <Text style={styles.infoLabel}>Elemento de Despesa:</Text>{" "}
                  {productInfo.elementoDespesa}
                </Text>
                <Text>
                  <Text style={styles.infoLabel}>Natureza de Despesa:</Text>{" "}
                  {productInfo.naturezaDespesa}
                </Text>
              </Surface>
            )}

            <TextInput
              label="Digite a Quantidade*"
              style={styles.input}
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <List.Section>
              <List.Accordion
                title={selectedValue == null ? "Categoria*" : selectedValue}
                expanded={expanded}
                onPress={handleAccordionPress}
              >
                <List.Item
                  title="Material de Escritório"
                  onPress={() => handleItemPress("Material de Escritório")}
                />
                <List.Item
                  title="Equipamentos de Informática"
                  onPress={() => handleItemPress("Equipamentos de Informática")}
                />
                <List.Item
                  title="Material de Limpeza"
                  onPress={() => handleItemPress("Material de Limpeza")}
                />
                <List.Item
                  title="Materiais Didáticos"
                  onPress={() => handleItemPress("Materiais Didáticos")}
                />
                <List.Item
                  title="Equipamentos de Laboratório"
                  onPress={() => handleItemPress("Equipamentos de Laboratório")}
                />
                <List.Item
                  title="Outro"
                  onPress={() => handleItemPress("Outro")}
                />
              </List.Accordion>
            </List.Section>

            <TextInput
              label="Descrição"
              style={styles.input}
              autoCapitalize="none"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={3}
            />

            <BtnPadrao
              title="Enviar Requisição"
              btnColor="#AE0F0A"
              textColor="white"
              onPress={handleSubmit}
            />

            {errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            {successMessage && (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    paddingBottom: 80,
  },
  formContainer: {
    padding: 16,
  },
  title: {
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  inputContainer: {
    position: "relative",
    zIndex: 10,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    zIndex: 20,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productInfo: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    elevation: 1,
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 8,
    fontStyle: "italic",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  errorText: {
    color: "#c62828",
  },
  successContainer: {
    backgroundColor: "#e8f5e9",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#c8e6c9",
  },
  successText: {
    color: "#2e7d32",
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default OrderScreen;
