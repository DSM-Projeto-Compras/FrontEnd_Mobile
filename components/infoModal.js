import * as React from 'react';
import { StyleSheet } from "react-native";
import { Modal, Portal, Text } from 'react-native-paper';

const InfoModal = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  // Exponha método para o componente pai
  React.useImperativeHandle(ref, () => ({
    showModal: (data) => {
      setModalData(data);
      setVisible(true);
    },
    hideModal: () => setVisible(false),
  }));

  const { itemName, nomeSolicitante, quantity, orderDate, status, type, category, description } = modalData;

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  };

  return (
    <Portal>
      <View>
        <Modal style={[styles.statusStrip, { backgroundColor: "#FF0000" }]} visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
          <Text variant="bodyLarge" style={styles.titleText}>
            Detalhes do Produto
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Solicitante: <Text style={styles.normalText}>{nomeSolicitante}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Nome: <Text style={styles.normalText}>{itemName}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Quantidade: <Text style={styles.normalText}>{quantity}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Data do Pedido: <Text style={styles.normalText}>{orderDate}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Status: <Text style={styles.normalText}>{status}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Tipo: <Text style={styles.normalText}>{type}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Categoria: <Text style={styles.normalText}>{category}</Text>
          </Text>
          <Text variant="bodyMedium" style={styles.boldText}>
            Descrição: <Text style={styles.normalText}>{description}</Text>
          </Text>
        </Modal>
      </View>
    </Portal>
  );
});

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  normalText: {
    fontWeight: "normal",
  },
  statusStrip: {
    width: 6,
  },
});

export default InfoModal;
