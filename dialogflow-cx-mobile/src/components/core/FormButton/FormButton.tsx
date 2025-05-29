import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {styles} from './FormButton.styles';

interface FormButtonProps {
  text: string;
  value: string;
  fullWidth?: boolean;
  mainColor: string;
  mainTextColor: string;
  onButtonClicked?: (value: string) => void;
}

const FormButton: React.FC<FormButtonProps> = ({
  text,
  value,
  fullWidth = true,
  mainColor,
  mainTextColor,
  onButtonClicked,
}) => {
  const handlePress = () => {
    if (onButtonClicked) {
      onButtonClicked(value);
    }
  };

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      backgroundColor: mainColor,
      width: fullWidth ? '100%' : 290,
    },
  ];

  const textStyle: StyleProp<TextStyle> = [
    styles.responseText,
    {
      color: mainTextColor,
    },
  ];

  return (
    <TouchableOpacity onPress={handlePress} style={buttonStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;
