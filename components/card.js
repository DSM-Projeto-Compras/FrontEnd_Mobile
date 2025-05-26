import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

const OrderCard = ({ itemName, quantity, orderDate, status = "Pendente" }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{itemName}</Text>
        <Text variant="bodyMedium">Quantidade: {quantity}</Text>
        <Text variant="bodyMedium">Data do Pedido: {orderDate}</Text>
        <Text variant="bodyMedium" style={[styles.status, status === "Negado" ? styles.denied : styles.pending]}>
          Status: {status}
        </Text>
      </Card.Content>
      <Card.Actions>
        {status === "Pendente" && <Button mode="contained">Editar</Button>}
        <Button mode="outlined">Ver Detalhes</Button>
        {status === "Negado" && <Button mode="outlined">Ver Justificativa</Button>}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 10,
  },
  status: {
    fontWeight: "bold",
    marginTop: 5,
  },
  pending: {
    color: "orange",
  },
  denied: {
    color: "red",
  },
});

export default OrderCard;