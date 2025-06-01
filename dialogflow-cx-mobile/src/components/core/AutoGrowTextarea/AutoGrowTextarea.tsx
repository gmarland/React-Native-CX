import React, { useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './AutoGrowTextarea.styles';

interface AutoGrowTextareaProps
  extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  placeholder?: string;
  textValue: string;
  setTextValue: (text: string) => void;
  onTextEntered?: () => void;
}

const AutoGrowTextarea: React.FC<AutoGrowTextareaProps> = ({
  placeholder = 'Message...',
  textValue,
  setTextValue,
  onTextEntered,
  ...rest
}) => {
  const textInputRef = useRef<TextInput | null>(null);

  const handleInput = (text: string) => {
    setTextValue(text);
  };

  const handleSubmit = () => {
    if (onTextEntered) {
      onTextEntered();
    }
    textInputRef.current?.focus();
  };

  return (
    <TextInput
      ref={textInputRef}
      value={textValue}
      placeholder={placeholder}
      onChangeText={handleInput}
      onSubmitEditing={handleSubmit}
      style={styles.textarea}
      {...rest}
    />
  );
};

export default AutoGrowTextarea;
