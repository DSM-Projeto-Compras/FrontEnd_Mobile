import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

const InfoModal = React.forwardRef((props, ref) => {
  const { isAdmin } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const [modalType, setModalType] = React.useState("detalhes");

  React.useImperativeHandle(ref, () => ({
    showModal: (data, type = "detalhes") => {
      setModalData(data);
      setModalType(type);
      setVisible(true);
    },
    hideModal: () => {
      setVisible(false);
    },
  }));

  const {
    itemName,
    nomeSolicitante,
    quantity,
    orderDate,
    status,
    productType,
    category,
    description,
    justificativa,
  } = modalData;

  const containerStyle = {
    backgroundColor: "transparent",
    marginHorizontal: 20,
  };

  const getStatusColor = (statusValue) => {
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

  return (
    <Portal>
      <Modal
        visible={visible && modalData && Object.keys(modalData).length > 0}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={containerStyle}
      >
        {modalData && (
          <View style={styles.modalWrapper}>
            <View
              style={[
                styles.statusStrip,
                { backgroundColor: getStatusColor(status) },
              ]}
            />
            <View style={styles.modalContent}>
              {modalType === "detalhes" ? (
                <>
                  <Text variant="bodyLarge" style={styles.titleText}>
                    Detalhes do Produto
                  </Text>
                  {isAdmin && (
                    <Text variant="bodyMedium" style={styles.boldText}>
                      Solicitante:{" "}
                      <Text style={styles.normalText}>{nomeSolicitante}</Text>
                    </Text>
                  )}
                  <Text variant="bodyMedium" style={styles.boldText}>
                    Nome: <Text style={styles.normalText}>{itemName}</Text>
                  </Text>
                  <Text variant="bodyMedium" style={styles.boldText}>
                    Quantidade:{" "}
                    <Text style={styles.normalText}>{quantity}</Text>
                  </Text>
                  <Text variant="bodyMedium" style={styles.boldText}>
                    Data do Pedido:{" "}
                    <Text style={styles.normalText}>{orderDate}</Text>
                  </Text>
                  <Text variant="bodyMedium" style={styles.boldText}>
                    Elemento de Despesa: <Text style={styles.normalText}>{productType}</Text>
                  </Text>
                  <Text variant="bodyMedium" style={styles.boldText}>
                    Classe: <Text style={styles.normalText}>{category}</Text>
                  </Text>
                  <Text variant="bodyMedium" style={styles.boldText}>
                    Descriminação:{" "}
                    <Text style={styles.normalText}>{description}</Text>
                  </Text>
                </>
              ) : (
                <>
                  <Text variant="bodyLarge" style={styles.titleText}>
                    Justificativa do Pedido
                  </Text>
                  <Text variant="bodyMedium" style={styles.normalText}>
                    {justificativa || "Sem justificativa fornecida."}
                  </Text>
                </>
              )}
            </View>
          </View>
        )}
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modalWrapper: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalContent: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
  },
  statusStrip: {
    width: 6,
    backgroundColor: "gray",
  },
  boldText: {
    fontWeight: "bold",
    padding: 5,
    marginBottom: 5,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
  normalText: {
    fontWeight: "normal",
    paddingBottom: 15,
  },
});

export default InfoModal;
