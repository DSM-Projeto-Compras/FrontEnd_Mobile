import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Menu, Divider, Portal } from "react-native-paper";
import BtnPadrao from "./button";
import InfoModal from "./infoModal";

const OrderCard = ({
  itemName,
  quantity,
  orderDate,
  status = "Pendente",
  nomeSolicitante = "Marcelo",
  type,
  category,
  description,
  isAdmin = true,
  onStatusChange = () => {},
  id,
  onVerDetalhes = () => {},
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const modalRef = useRef();

  const getStatusColor = (statusValue = currentStatus) => {
    switch (statusValue) {
      case "Pendente":
        return "#FFEB3B";
      case "Negado":
        return "#F44336";
      case "Aprovado":
        return "#4CAF50";
      default:
        return "#BDBDBD";
    }
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleStatusSelect = (newStatus) => {
    setCurrentStatus(newStatus);
    closeMenu();
    onStatusChange(id, newStatus);
  };

  return (
    <View style={styles.wrapper}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="titleMedium" style={styles.title}>{itemName}</Text>
            {isAdmin ? (
              <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={
                  <Text
                    onPress={openMenu}
                    style={[styles.statusText, { color: "#155DFC" }]}
                  >
                    {currentStatus}
                  </Text>
                }
              >
                <Menu.Item onPress={() => handleStatusSelect("Pendente")} title="Pendente" />
                <Divider />
                <Menu.Item onPress={() => handleStatusSelect("Aprovado")} title="Aprovado" />
                <Divider />
                <Menu.Item onPress={() => handleStatusSelect("Negado")} title="Negado" />
              </Menu>
            ) : (
              <Text variant="titleMedium" style={styles.statusText}>{currentStatus}</Text>
            )}
          </View>

          {isAdmin && nomeSolicitante && (
            <Text variant="bodyMedium" style={styles.boldText}>
              Solicitante: <Text style={styles.normalText}>{nomeSolicitante}</Text>
            </Text>
          )}

          <Text variant="bodyMedium" style={styles.boldText}>
            Quantidade: <Text style={styles.normalText}>{quantity}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Data do Pedido: <Text style={styles.normalText}>{orderDate}</Text>
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          {currentStatus === "Pendente" && !isAdmin && (
            <BtnPadrao
              title={"Editar"}
              onPress={() => console.log("Editar")}
              btnColor="#155DFC"
              style={styles.button}
            />
          )}
          {currentStatus === "Negado" && (
            <BtnPadrao
              title={"Ver Justificativa"}
              onPress={() => console.log("Ver Justificativa")}
              btnColor="#155DFC"
              style={styles.button}
            />
          )}
          <BtnPadrao
            title={"Ver Detalhes"}
            onPress={() => onVerDetalhes({
              itemName,
              quantity,
              orderDate,
              nomeSolicitante,
              status: currentStatus,
              type,
              category,
              description,
              id,
            })}
            btnColor="#155DFC"
            style={styles.button}
          />
        </Card.Actions>
      </Card>
      <View style={[styles.statusStrip, { backgroundColor: getStatusColor(currentStatus) }]} />
      <InfoModal ref={modalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  statusStrip: {
    width: 6,
  },
  card: {
    flex: 1,
    backgroundColor: "#F2EEF8",
    borderLeftWidth: 0,
    paddingBottom: 10,
    borderRadius: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontWeight: "bold",
    flex: 1,
  },
  statusText: {
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  normalText: {
    fontWeight: "normal",
  },
  actions: {
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingTop: 5,
    gap: 10,
  },
  button: {
    marginRight: 8,
    marginTop: 5,
  },
});

export default OrderCard;
