import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton, useTheme } from 'react-native-paper';

const EmailCard = ({ name, email, onDelete }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card} elevation={2}>
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text variant="titleMedium" style={styles.name}>
            {name}
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
          containerColor={theme.colors.primary}
          style={styles.deleteButton}
          onPress={onDelete}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    padding: 12,
    backgroundColor: '#EDE7F6',
    borderRadius: 12,
    height: 80
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSection: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 18,
  },
  deleteButton: {
    borderRadius: 24,
  },
});

export default EmailCard;