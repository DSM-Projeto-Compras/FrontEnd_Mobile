import React, { useEffect } from "react";
import { Text, ActivityIndicator } from "react-native-paper";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Header from "../components/header";
import BottomNavAdm from "../components/bottomNavAdm";
import BtnPadrao from "../components/button";
import EmailCard from "../components/cardAdmin";
import Toast from "../components/toast";
import { useAdmin } from "../contexts/AdminContext";

const AdmScreen = () => {
  const navigation = useNavigation();
  const {
    allAdmins,
    currentUser,
    loading,
    error,
    getAllAdmins,
    deleteAdmin,
    successMessage,
    errorMessage,
    clearMessages,
  } = useAdmin();

  useEffect(() => {
    getAllAdmins();
  }, []);

  // Atualizar lista quando a tela receber foco
  useFocusEffect(
    React.useCallback(() => {
      getAllAdmins();
    }, [])
  );

  const handleDelete = async (adminId) => {
    try {
      await deleteAdmin(adminId);
    } catch (error) {
      console.error("Erro ao deletar administrador:", error);
    }
  };

  const admins = Array.isArray(allAdmins) ? allAdmins : [];

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />

        <Text variant="headlineMedium" style={styles.title}>
          Administradores
        </Text>

        <View style={styles.formContainer}>
          <BtnPadrao
            title={"Cadastrar"}
            onPress={() => navigation.navigate("RegisterAdm")}
            btnColor="#AE0F0A"
            textColor="white"
          />
        </View>

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#AE0F0A" />
          </View>
        )}

        {!loading && admins.length === 0 && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>
              Nenhum administrador encontrado
            </Text>
          </View>
        )}

        {!loading &&
          admins.map((admin, index) => {
            return (
              <EmailCard
                key={admin._id || admin.id || `admin-${index}`}
                name={admin.nome || admin.name || "Nome não informado"}
                email={admin.email || "Email não informado"}
                isCurrentUser={
                  currentUser &&
                  (currentUser._id === admin._id)
                }
                onDelete={() => handleDelete(admin._id || admin.id)}
              />
            );
          })}
      </ScrollView>

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
  formContainer: {
    padding: 16,
  },
  title: {
    marginVertical: 20,
    textAlign: "center",
    flex: 1,
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

export default AdmScreen;
