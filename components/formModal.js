import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    padding: 0,
    maxHeight: '80%', 
    // minHeight: 380,   
    width: '92%',
    alignSelf: 'center',
    justifyContent: 'center',
    // paddingVertical: 16,
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={containerStyle}>
        {modalType === "editar" ? (
          <View style={styles.editModalContainer}>
            <View style={styles.editYellowBar} />
            <KeyboardAwareScrollView
              contentContainerStyle={styles.editContent}
              enableOnAndroid
              extraScrollHeight={8}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
            >
              <View style={styles.editHeader}>
                <Text style={styles.editTitle}>{formData.itemName || "Nome do Produto"}</Text>
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
                style={styles.editInputLarge}
                placeholder="Descriminação"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => handleChange("description", text)}
              />
              <View style={styles.buttonGroup}>
                <Button mode="contained" onPress={() => setVisible(false)} style={{backgroundColor: '#AE0F0A'}} labelStyle={{ color: '#fff' }}> Excluir </Button>
                <Button mode="contained" onPress={() => setVisible(false)}>Cancelar</Button>
                <Button mode="contained" onPress={handleConfirm}>Confirmar</Button>
              </View>
            </KeyboardAwareScrollView>
          </View>
        ) : (
          <View style={styles.justModalContainer}>
            <View style={styles.justRedBar} />
            <KeyboardAwareScrollView
              contentContainerStyle={styles.justContent}
              enableOnAndroid
              extraScrollHeight={8}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.justTitle}>Negar Produto</Text>
              <Text style={styles.justSubtitle}>Tem certeza de que quer negar este pedido?</Text>
              <Text style={styles.justLabel}>Justificativa:</Text>
              <TextInput
                style={styles.justInput}
                placeholder="Digite uma justificativa"
                multiline
                numberOfLines={5}
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
            </KeyboardAwareScrollView>
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
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
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
  justModalContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    height: 340,
  },
  justContent: {
    padding: 24,
    justifyContent: 'flex-start',
    paddingBottom: 8, 
  },
  justRedBar: {
    width: 6,
    backgroundColor: '#F44336',
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
    backgroundColor: '#155DFC',
    borderRadius: 24,
    marginRight: 8,
    minWidth: 120,
  },
  justConfirmButton: {
    backgroundColor: '#AE0F0A',
    borderRadius: 24,
    minWidth: 120,
  },
  editModalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 380,
    flexDirection: 'row',
  },
  editContent: {
    padding: 24,
    justifyContent: 'flex-start',
    paddingBottom: 8, 
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
  editInputLarge: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F3EEF8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
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
    width: 6,
    backgroundColor: '#FFEB3B',
    right: 0,
    top: 0,
    bottom: 0,
  },
});