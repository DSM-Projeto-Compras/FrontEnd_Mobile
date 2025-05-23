import React from 'react';
import { Button } from 'react-native-paper';

const Button = ({ title, onPress, color = '#6200ee' }) => {
  return (
    <Button mode="contained" onPress={onPress} buttonColor={color}>
      {title}
    </Button>
  );
};

export default Button;