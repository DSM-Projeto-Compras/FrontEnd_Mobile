import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Header from "../components/header";
import BottomNav from "../components/bottomNavigation";
import OrderCard from "../components/card";
import InfoModal from "../components/infoModal"; // certifique-se de importar corretamente

const HistScreen = () => {
  const modalRef = useRef();

  const abrirDetalhes = (itemData) => {
    modalRef.current?.showModal(itemData);
  };

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <Text variant="headlineMedium" style={styles.title}>Histórico</Text>

        <OrderCard 
          itemName="Caneta"
          quantity={4}
          orderDate="10/04/2025"
          type="material-de-consumo"
          category="material-de-escritorio"
          description="Caneta esferográfica azul para uso do professor"
          onVerDetalhes={abrirDetalhes}
        />
        <OrderCard 
          itemName="Caixa de Giz de Cera"
          quantity={2}
          orderDate="18/02/2025"
          type="material-de-consumo"
          category="material-de-escritorio"
          description="Caixa de Giz de cera com cores mistas e pussuindo 12 unidades para utilização em projeto"
          onVerDetalhes={abrirDetalhes}
        />
        <OrderCard 
          itemName="Condicionador de Ar"
          quantity={1}
          orderDate="04/05/2025"
          type="material-permanente"
          category="moveis-equipamentos"
          description="Ar-Condicionado para instalação na sala de Obras"
          onVerDetalhes={abrirDetalhes}
        />
        <OrderCard 
          itemName="Chapa de MDF 15mm"
          quantity={15}
          orderDate="28/02/2025"
          type="material-de-consumo"
          category="material-de-construcao-manutencao"
          description="Chapas de MDF para projeto de construção"
          onVerDetalhes={abrirDetalhes}
        />
      </ScrollView>

      {/* Modal compartilhado */}
      <InfoModal ref={modalRef} />

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
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HistScreen;
