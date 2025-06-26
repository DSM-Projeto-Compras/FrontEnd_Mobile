import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import OrderCard from "../components/card";
import InfoModal from "../components/infoModal";
import Toast from "../components/toast";
import { useProduct } from "../contexts/ProductContext";

const HistScreen = () => {
  const modalRef = useRef();
  const {
    products,
    loading,
    error,
    getProducts,
    successMessage,
    errorMessage,
    clearSuccessMessage,
    clearErrorMessage,
  } = useProduct();

  const abrirDetalhes = (itemData) => {
    modalRef.current?.showModal(itemData);
  };

  const handleProductUpdated = async () => {
    await getProducts();
  };

  const handleProductDeleted = async () => {
    await getProducts();
  };

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) => {
      const dateA = new Date(a.data || a.orderDate || 0);
      const dateB = new Date(b.data || b.orderDate || 0);
      return dateB - dateA;
    });
  }, [products]);

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <Text variant="headlineMedium" style={styles.title}>
          Histórico
        </Text>

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#AE0F0A" />
          </View>
        )}

        {error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Erro: {error}</Text>
          </View>
        )}

        {!loading && !error && products.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          </View>
        )}

        {!loading &&
          !error &&
          sortedProducts.map((product, index) => (
            <OrderCard
              key={product._id || product.id || `product-${index}`}
              id={product._id || product.id}
              itemName={product.nome || product.name}
              quantity={product.quantidade || product.quantity || 1}
              orderDate={
                product.data
                  ? new Date(product.data).toLocaleDateString("pt-BR")
                  : product.orderDate || new Date().toLocaleDateString("pt-BR")
              }
              productType={
                product.tipo || product.type || "material-de-consumo"
              }
              category={product.categoria || product.category || "geral"}
              description={product.descricao || product.description || ""}
              status={product.status || "Pendente"}
              nomeSolicitante={product.userId?.nome || "Não informado"}
              justificativa={product.justificativa || ""}
              isAdmin={false}
              onVerDetalhes={abrirDetalhes}
              onProductUpdated={handleProductUpdated}
              onProductDeleted={handleProductDeleted}
            />
          ))}
      </ScrollView>

      <InfoModal ref={modalRef} />

      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>

      <Toast
        successMessage={successMessage}
        errorMessage={errorMessage}
        onDismissSuccess={clearSuccessMessage}
        onDismissError={clearErrorMessage}
      />
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
  title: {
    marginVertical: 20,
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
  },
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});

export default HistScreen;
