import React, { useRef, useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator, IconButton } from "react-native-paper";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import OrderCard from "../components/card";
import InfoModal from "../components/infoModal";
import FilterModal from "../components/FilterModal";
import Toast from "../components/toast";
import { useProduct } from "../contexts/ProductContext";

const HistScreen = () => {
  const modalRef = useRef();
  const filterModalRef = useRef();
  const [filters, setFilters] = useState({ status: [], type: [] });

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

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ status: [], type: [] });
  };

  const handleOpenFilter = () => {
    filterModalRef.current?.show();
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Aplicar filtro por nome
    if (filters.name && filters.name.length > 0) {
      filtered = filtered.filter((product) =>
        (product.nome || product.name || "")
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    // Aplicar filtros de status
    if (filters.status.length > 0) {
      filtered = filtered.filter((product) =>
        filters.status.includes(product.status || "Pendente")
      );
    }

    // Aplicar filtros de tipo
    if (filters.type.length > 0) {
      filtered = filtered.filter((product) =>
        filters.type.includes(product.tipo || "material-de-consumo")
      );
    }

    // Ordenar por data
    return filtered.sort((a, b) => {
      const dateA = new Date(a.data || a.orderDate || 0);
      const dateB = new Date(b.data || b.orderDate || 0);
      return dateB - dateA;
    });
  }, [products, filters]);

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    (filters.name && filters.name.length > 0);

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <Text variant="headlineMedium" style={styles.title}>
          Histórico
        </Text>

        <IconButton
          icon="filter-variant"
          size={28}
          iconColor={hasActiveFilters ? "#AE0F0A" : "#666"}
          style={[
            styles.filterButton,
            hasActiveFilters && styles.filterButtonActive,
          ]}
          onPress={handleOpenFilter}
        />

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

        {!loading && !error && filteredAndSortedProducts.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {hasActiveFilters
                ? "Nenhum produto encontrado com os filtros aplicados"
                : "Nenhum produto encontrado"}
            </Text>
          </View>
        )}

        {!loading &&
          !error &&
          filteredAndSortedProducts.map((product, index) => (
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
      <FilterModal
        ref={filterModalRef}
        isAdmin={false}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

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
    fontWeight: "bold",
  },
  filterButton: {
    position: "absolute",
    top: 105,
    right: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    zIndex: 1,
  },
  filterButtonActive: {
    backgroundColor: "#ffebee",
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
