import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

const InfoModal = React.forwardRef((props, ref, {
  itemName,
  quantity,
  orderDate,
  status = "Pendente",
  nomeSolicitante = "Marcelo",
  isAdmin = true,
  onStatusChange = () => {},
  id,
}) => {
  const [visible, setVisible] = React.useState(false);

  // Exponha as funções para o componente pai via ref
  React.useImperativeHandle(ref, () => ({
    showModal: () => setVisible(true),
    hideModal: () => setVisible(false),
  }));

  const containerStyle = { backgroundColor: 'white', padding: 20, marginHorizontal: 20, };

  return (
    <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
            <Text variant="bodyMedium" style={styles.boldText}>
                Solicitante: <Text style={styles.normalText}>{nomeSolicitante}</Text>
            </Text>
            <Text variant="bodyMedium" style={styles.boldText}>
                Quantidade: <Text style={styles.normalText}>{quantity}</Text>
            </Text>
            <Text variant="bodyMedium" style={styles.boldText}>
                Data do Pedido: <Text style={styles.normalText}>{orderDate}</Text>
            </Text>
        </Modal>
    </Portal>
  );
});

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

export default InfoModal;
