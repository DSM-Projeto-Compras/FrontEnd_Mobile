import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import Header from "../components/header";
import OrderCard from "../components/card";
import InfoModal from "../components/infoModal";
import BottomNavAdm from "../components/bottomNavAdm";
import Toast from "../components/toast";
import { useAdmin } from "../contexts/AdminContext";

const HistAdmScreen = () => {
  const modalRef = useRef();
  const {
    allProducts,
    loading,
    error,
    approveProduct,
    successMessage,
    errorMessage,
    clearMessages,
  } = useAdmin();

  const abrirDetalhes = (itemData) => {
    modalRef.current?.showModal(itemData);
  };

  const handleStatusChange = async (id, status, justificativa = null) => {
    try {
      console.log("handleStatusChange chamado:", { id, status, justificativa });
      await approveProduct(id, status, justificativa);
      console.log("Status alterado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar status do produto:", error);
    }
  };

  const sortedProducts = React.useMemo(() => {
    return [...allProducts].sort((a, b) => {
      const dateA = new Date(a.data || a.orderDate || 0);
      const dateB = new Date(b.data || b.orderDate || 0);
      return dateB - dateA;
    });
  }, [allProducts]);

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <Text variant="headlineMedium" style={styles.title}>
          Histórico
        </Text>

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Carregando produtos...</Text>
          </View>
        )}

        {error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Erro: {error}</Text>
          </View>
        )}

        {!loading && !error && allProducts.length === 0 && (
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
              isAdmin={true}
              onStatusChange={handleStatusChange}
              onVerDetalhes={abrirDetalhes}
            />
          ))}
      </ScrollView>

      <InfoModal ref={modalRef} />

      <Toast
        successMessage={successMessage}
        errorMessage={errorMessage}
        onDismissSuccess={clearMessages}
        onDismissError={clearMessages}
      />

      <View style={styles.bottomNavContainer}>
        <BottomNavAdm />
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
  title: {
    marginVertical: 20,
    textAlign: "center",
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
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
  loadingText: {
    marginTop: 10,
    textAlign: "center",
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

export default HistAdmScreen;
