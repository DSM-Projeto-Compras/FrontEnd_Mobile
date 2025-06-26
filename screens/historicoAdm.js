import React, { useRef, useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator, IconButton } from "react-native-paper";
import Header from "../components/header";
import OrderCard from "../components/card";
import InfoModal from "../components/infoModal";
import FilterModal from "../components/FilterModal";
import BottomNavAdm from "../components/bottomNavAdm";
import Toast from "../components/toast";
import { useAdmin } from "../contexts/AdminContext";

const HistAdmScreen = () => {
  const modalRef = useRef();
  const filterModalRef = useRef();
  const [filters, setFilters] = useState({ status: [], type: [] });

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
      await approveProduct(id, status, justificativa);
    } catch (error) {
      console.error("Erro ao atualizar status do produto:", error);
    }
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
    let filtered = [...allProducts];

    if (filters.name && filters.name.length > 0) {
      filtered = filtered.filter((product) =>
        (product.nome || product.name || "")
          .toLowerCase()
          .includes(filters.name.toLowerCase())
      );
    }

    if (filters.requesterName && filters.requesterName.length > 0) {
      filtered = filtered.filter((product) =>
        (product.userId?.nome || "")
          .toLowerCase()
          .includes(filters.requesterName.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter((product) =>
        filters.status.includes(product.status || "Pendente")
      );
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter((product) =>
        filters.type.includes(product.tipo || "material-de-consumo")
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.data || a.orderDate || 0);
      const dateB = new Date(b.data || b.orderDate || 0);
      return dateB - dateA;
    });
  }, [allProducts, filters]);

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    (filters.name && filters.name.length > 0) ||
    (filters.requesterName && filters.requesterName.length > 0);

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
            <ActivityIndicator size="large" />
          </View>
        )}

        {!loading && filteredAndSortedProducts.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              {hasActiveFilters
                ? "Nenhum produto encontrado com os filtros aplicados"
                : "Nenhum produto encontrado"}
            </Text>
          </View>
        )}

        {!loading &&
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
              isAdmin={true}
              onStatusChange={handleStatusChange}
              onVerDetalhes={abrirDetalhes}
            />
          ))}
      </ScrollView>

      <InfoModal ref={modalRef} />
      <FilterModal
        ref={filterModalRef}
        isAdmin={true}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
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
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});

export default HistAdmScreen;
