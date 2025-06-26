import react, { useState, useEffect } from "react";
import { TextInput, Text, Surface } from "react-native-paper";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import BtnPadrao from "../components/button";
import Toast from "../components/toast";
import { useBECSearch } from "../contexts/BECContext";
import { useProduct } from "../contexts/ProductContext";

const OrderScreen = () => {
  const {
    products,
    isLoading,
    getProducts,
    searchProduct,
    getProductDetails,
    clearProducts,
  } = useBECSearch();

  const {
    createProduct,
    loading: productLoading,
    successMessage,
    errorMessage,
    clearSuccessMessage,
    clearErrorMessage,
  } = useProduct();

  const [productName, setProductName] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState(null);

  useEffect(() => {
    clearProducts();
    return () => {
      clearProducts();
    };
  }, []);

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
      setLocalErrorMessage("Falha ao obter detalhes do produto");
    }
  };

  const handleSubmit = async () => {
    setLocalErrorMessage(null);

    if (!isSuggestionSelected) {
      setLocalErrorMessage("Por favor, selecione uma sugestão de produto.");
      return;
    }

    if (!productName || !quantidade) {
      setLocalErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      let tipo = "material-de-consumo";

      if (productInfo) {
        if (
          productInfo.naturezaDespesa &&
          productInfo.naturezaDespesa.startsWith("4")
        ) {
          tipo = "material-permanente";
        }
      }

      const productData = {
        nome: productName.trim(),
        quantidade: parseInt(quantidade),
        descricao: descricao?.trim() || "",
        tipo: tipo,
        ...(productInfo && {
          categoria: productInfo.classe || "",
          material: productInfo.material || "",
          elementoDespesa: productInfo.elementoDespesa || "",
          naturezaDespesa: productInfo.naturezaDespesa || "",
        }),
      };

      await createProduct(productData);

      setProductName("");
      setQuantidade("");
      setDescricao("");
      setProductInfo(null);
      setIsSuggestionSelected(false);
      clearProducts();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      setLocalErrorMessage(
        error.message || "Erro ao solicitar produto. Tente novamente."
      );
    }
  };

  const handleDismissLocalError = () => {
    setLocalErrorMessage(null);
  };

  const handleQuantidadeChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setQuantidade(numericValue);
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
              onChangeText={handleQuantidadeChange}
            />

            <TextInput
              label="Descriminação"
              style={[styles.input, styles.textAreaInput]}
              autoCapitalize="none"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <BtnPadrao
              title={productLoading ? "Enviando..." : "Enviar Requisição"}
              btnColor="#AE0F0A"
              textColor="white"
              onPress={handleSubmit}
              disabled={productLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>

      <Toast
        successMessage={successMessage}
        errorMessage={errorMessage || localErrorMessage}
        onDismissSuccess={clearSuccessMessage}
        onDismissError={
          errorMessage ? clearErrorMessage : handleDismissLocalError
        }
      />
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
  textAreaInput: {
    minHeight: 120,
  },
  inputContainer: {
    position: "relative",
    zIndex: 10,
    marginBottom: 16,
  },
  suggestionsContainer: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    zIndex: 1000,
    maxHeight: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#ffffff",
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
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default OrderScreen;
