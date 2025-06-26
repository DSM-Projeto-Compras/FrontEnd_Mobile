import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Card, IconButton, useTheme } from "react-native-paper";

const EmailCard = ({ name, email, isCurrentUser, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirmar exclusão",
      `Tem certeza que deseja remover o administrador ${name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <Card style={styles.card} elevation={2}>
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text variant="titleMedium" style={styles.name}>
            {name}{" "}
            {isCurrentUser && <Text style={styles.youLabel}>(você)</Text>}
          </Text>
          <Text variant="bodyMedium" style={styles.emailText}>
            <Text style={styles.label}>E-mail: </Text>
            {email}
          </Text>
        </View>
        <IconButton
          icon="trash-can"
          size={32}
          iconColor="white"
          containerColor="#AE0F0A"
          style={styles.deleteButton}
          onPress={handleDelete}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: "#EDE7F6",
    borderRadius: 12,
    height: "auto",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textSection: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 18,
  },
  deleteButton: {
    borderRadius: 24,
  },
  youLabel: {
    color: "#666",
    fontWeight: "normal",
    fontSize: 14,
  },
});

export default EmailCard;
