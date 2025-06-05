import React from 'react';
import { Button } from 'react-native-paper';

const BtnPadrao = ({ 
  title, 
  onPress, 
  btnColor = "#155DFC", 
  textColor = "white",
  disabled = false,
  style 
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      buttonColor={disabled ? "#ccc" : btnColor}
      textColor={disabled ? "#666" : textColor}
      style={[{ marginVertical: 8 }, style]}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default BtnPadrao;