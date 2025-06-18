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
          <>
            <Text variant="titleMedium" style={styles.title}>Editar Pedido</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Produto"
              value={formData.itemName}
              onChangeText={(text) => handleChange("itemName", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={String(formData.quantity)}
              onChangeText={(text) => handleChange("quantity", text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              multiline
              numberOfLines={3}
              value={formData.description}
              onChangeText={(text) => handleChange("description", text)}
            />
          </>
        ) : (
          <>
            <Text variant="titleMedium" style={styles.title}>Justificativa da Negação</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Digite a justificativa"
              multiline
              numberOfLines={4}
              value={justification}
              onChangeText={setJustification}
            />
          </>
        )}

        <View style={styles.buttonGroup}>
          <Button onPress={() => setVisible(false)}>Cancelar</Button>
          <Button mode="contained" onPress={handleConfirm}>Confirmar</Button>
        </View>
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
});

