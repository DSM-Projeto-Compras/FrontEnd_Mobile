import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';

const FormModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState("editar");
  const [formData, setFormData] = useState({});
  const [justification, setJustification] = useState("justificativa");

  useImperativeHandle(ref, () => ({
    showModal: (data, type = "editar") => {
      setFormData(data);
      setModalType(type);
      setJustification(data.justificativa || "");
      setVisible(true);
    },
    hideModal: () => setVisible(false),
  }));

  const handleConfirm = () => {
    if (modalType === "editar" && props.onSubmitEdit) {
      props.onSubmitEdit(formData);
    }

    if (modalType === "justificativa" && props.onSubmitJustification) {
      props.onSubmitJustification(formData, justification);
    }

    setVisible(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerStyle = {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
        {modalType === "editar" ? (
          <View style={styles.editModalContainer}>
            <View style={styles.editContent}>
              <View style={styles.editHeader}>
                <Text style={styles.editTitle}>{formData.itemName || "Nome do Produto"}</Text>
                <Text style={styles.editStatus}>Pendente</Text>
              </View>
              <Text style={styles.editLabel}>
                <Text style={{ fontWeight: 'bold' }}>Quantidade:</Text> {formData.quantity || 1}
              </Text>
              <Text style={styles.editLabel}>
                <Text style={{ fontWeight: 'bold' }}>Data do Pedido:</Text> {formData.orderDate || "22/03/2025"}
              </Text>

              <TextInput
                style={styles.editInput}
                placeholder="Quantidade"
                value={String(formData.quantity)}
                onChangeText={(text) => handleChange("quantity", text)}
              />
              <TextInput
                style={styles.editInput}
                placeholder="Categoria"
                value={formData.category}
                onChangeText={(text) => handleChange("category", text)}
              />
              <TextInput
                style={styles.editInput}
                placeholder="Tipo"
                value={formData.productType}
                onChangeText={(text) => handleChange("productType", text)}
              />
              <TextInput
                style={styles.editInput}
                placeholder="Descrição"
                multiline
                numberOfLines={2}
                value={formData.description}
                onChangeText={(text) => handleChange("description", text)}
              />

              <View style={styles.editButtonGroup}>
                <Button
                  mode="contained"
                  onPress={() => setVisible(false)}
                  style={styles.editDeleteButton}
                  labelStyle={{ color: '#fff' }}
                >
                  Excluir
                </Button>
              </View>
            </View>
            <View style={styles.editYellowBar} />
          </View>
        ) : (
          <View style={styles.justModalContainer}>
            <View style={styles.justContent}>
              <Text style={styles.justTitle}>Negar Produto</Text>
              <Text style={styles.justSubtitle}>Tem certeza de que quer negar este pedido?</Text>
              <Text style={styles.justLabel}>Justificativa:</Text>
              <TextInput
                style={styles.justInput}
                placeholder="Digite uma justificativa"
                multiline
                numberOfLines={4}
                value={justification}
                onChangeText={setJustification}
              />
              <View style={styles.justButtonGroup}>
                <Button
                  mode="contained"
                  onPress={() => setVisible(false)}
                  style={styles.justCancelButton}
                  labelStyle={{ color: '#fff' }}
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={handleConfirm}
                  style={styles.justConfirmButton}
                  labelStyle={{ color: '#fff' }}
                >
                  Confirmar
                </Button>
              </View>
            </View>
            <View style={styles.justRedBar} />
          </View>
        )}
        {modalType === "editar" && (
          <View style={styles.buttonGroup}>
            <Button onPress={() => setVisible(false)}>Cancelar</Button>
            <Button mode="contained" onPress={handleConfirm}>Confirmar</Button>
          </View>
        )}
      </Modal>
    </Portal>
  );
});

export default FormModal;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10, // se seu React Native não suporta `gap`, substitua por marginRight nos botões
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#B0B0B0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  // --- Estilos para o modal de justificativa ---
  justModalContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 380,
  },
  justContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  justRedBar: {
    width: 8,
    backgroundColor: '#FF0000',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  justTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  justSubtitle: {
    fontSize: 16,
    color: '#222',
    marginBottom: 18,
  },
  justLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  justInput: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    padding: 12,
    minHeight: 100,
    backgroundColor: '#fff',
    marginBottom: 24,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  justButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  justCancelButton: {
    backgroundColor: '#757575',
    borderRadius: 5,
    marginRight: 8,
    minWidth: 120,
  },
  justConfirmButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 5,
    minWidth: 120,
  },
  // --- Estilos para o modal de edição ---
  editModalContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 380,
  },
  editContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  editStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  editLabel: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F3EEF8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  editButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 16,
  },
  editDeleteButton: {
    backgroundColor: '#155DFC',
    borderRadius: 8,
    minWidth: 120,
    marginRight: 8,
  },
  editConfirmButton: {
    backgroundColor: '#155DFC',
    borderRadius: 8,
    minWidth: 120,
  },
  editYellowBar: {
    width: 8,
    backgroundColor: '#FFEB3B',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});