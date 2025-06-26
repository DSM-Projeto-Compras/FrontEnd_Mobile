import React, { useState, useImperativeHandle, forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Card,
  Button,
  Chip,
  Divider,
  TextInput,
} from "react-native-paper";

const FilterModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [productName, setProductName] = useState("");
  const [requesterName, setRequesterName] = useState("");

  const statusOptions = ["Pendente", "Aprovado", "Negado"];
  const typeOptions = ["material-de-consumo", "material-permanente"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pendente":
        return "#FCBA03";
      case "Negado":
        return "#F44336";
      case "Aprovado":
        return "#4CAF50";
      default:
        return "#E0E0E0";
    }
  };

  const getStatusTextColor = (status, isSelected) => {
    if (isSelected) {
      return "#FFFFFF";
    }
    switch (status) {
      case "Pendente":
        return "#FCBA03";
      case "Negado":
        return "#F44336";
      case "Aprovado":
        return "#2E7D32";
      default:
        return "#666666";
    }
  };

  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: () => setVisible(false),
  }));

  const handleStatusToggle = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    const filters = {
      status: selectedStatus,
      type: selectedType,
      name: productName.trim(),
      ...(props.isAdmin && { requesterName: requesterName.trim() }),
    };
    props.onApplyFilters?.(filters);
    setVisible(false);
  };

  const handleClear = () => {
    setSelectedStatus([]);
    setSelectedType([]);
    setProductName("");
    setRequesterName("");
    props.onClearFilters?.();
  };

  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              Filtros
            </Text>

            <Divider style={styles.divider} />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Nome do Produto
            </Text>
            <TextInput
              label="Buscar por nome"
              value={productName}
              onChangeText={setProductName}
              style={styles.textInput}
              mode="outlined"
              placeholder="Digite o nome do produto..."
            />

            {props.isAdmin && (
              <>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Nome do Solicitante
                </Text>
                <TextInput
                  label="Buscar por solicitante"
                  value={requesterName}
                  onChangeText={setRequesterName}
                  style={styles.textInput}
                  mode="outlined"
                  placeholder="Digite o nome do solicitante..."
                />
              </>
            )}

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Status
            </Text>
            <View style={styles.chipContainer}>
              {statusOptions.map((status) => (
                <Chip
                  key={status}
                  selected={selectedStatus.includes(status)}
                  onPress={() => handleStatusToggle(status)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selectedStatus.includes(status)
                        ? getStatusColor(status)
                        : "transparent",
                      borderColor: getStatusColor(status),
                      borderWidth: 2,
                    },
                  ]}
                  textStyle={{
                    color: getStatusTextColor(
                      status,
                      selectedStatus.includes(status)
                    ),
                  }}
                  showSelectedCheck={false}
                  mode="outlined"
                >
                  {status}
                </Chip>
              ))}
            </View>

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Tipo
            </Text>
            <View style={styles.chipContainer}>
              {typeOptions.map((type) => (
                <Chip
                  key={type}
                  selected={selectedType.includes(type)}
                  onPress={() => handleTypeToggle(type)}
                  style={styles.chip}
                  mode={selectedType.includes(type) ? "flat" : "outlined"}
                >
                  {type === "material-de-consumo"
                    ? "Material de Consumo"
                    : "Material Permanente"}
                </Chip>
              ))}
            </View>

            <Divider style={styles.divider} />

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={handleClear}
                style={styles.button}
              >
                Limpar
              </Button>
              <Button
                mode="contained"
                onPress={handleApply}
                style={styles.button}
                buttonColor="#AE0F0A"
              >
                Aplicar
              </Button>
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    margin: 20,
  },
  card: {
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    fontWeight: "bold",
    marginRight: 6,
    marginBottom: 6,
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  textInput: {
    marginBottom: 16,
  },
});

export default FilterModal;
