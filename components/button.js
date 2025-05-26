import React from 'react';
import { Button } from 'react-native-paper';

const BtnPadrao = ({ title, onPress, btnColor = '#6200ee' }) => {
  return (
    <Button mode="contained" onPress={onPress} buttonColor={btnColor}>
      {title}
    </Button>
  );
};

export default BtnPadrao;