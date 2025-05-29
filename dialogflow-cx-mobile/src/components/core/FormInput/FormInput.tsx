import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {IFormInput} from '../../../interfaces/form/IFormInput';

import {formStyles} from '../../form/ChatForm/ChatForm.styles';
import {styles} from './FormInput.styles';

interface FormInputProps {
  isSubmitting: boolean;
  isPassword?: boolean;
  formInput: IFormInput;
  erroredFields: string[];
  formData: Record<string, any>;
  setErroredFields: (erroredFields: string[]) => void;
  setFormData: (formData: Record<string, any>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  isSubmitting,
  isPassword = false,
  formInput,
  erroredFields,
  formData,
  setErroredFields,
  setFormData,
}) => {
  const handleFieldUpdate = (fieldName: string, fieldValue: string) => {
    const updatedErroredFields = erroredFields.filter(
      field => field !== fieldName,
    );

    if (isSubmitting && (!fieldValue || fieldValue.trim() === '')) {
      updatedErroredFields.push(fieldName);
    }

    setErroredFields(updatedErroredFields);
    setFormData({...formData, [fieldName]: fieldValue});
  };

  const isErrored = erroredFields.includes(formInput.name);

  return (
    <View>
      <Text style={formStyles.formInputLabel}>{formInput.label}</Text>
      <TextInput
        secureTextEntry={isPassword}
        placeholder={formInput.placeholder || ''}
        value={formData[formInput.name] || ''}
        onChangeText={text => handleFieldUpdate(formInput.name, text)}
        style={[styles.formTextInput, isErrored && styles.erroredInput]}
      />
    </View>
  );
};

export default FormInput;
