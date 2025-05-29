import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {IFormInput} from '../../../interfaces/form/IFormInput';

import {formStyles} from '../../form/ChatForm/ChatForm.styles';
import {styles} from './FormTextarea.styles';

interface FormTextareaProps {
  isSubmitting: boolean;
  formInput: IFormInput;
  erroredFields: string[];
  formData: Record<string, any>;
  setErroredFields: (erroredFields: string[]) => void;
  setFormData: (formData: Record<string, any>) => void;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  isSubmitting,
  formInput,
  erroredFields,
  formData,
  setErroredFields,
  setFormData,
}) => {
  const fieldUpdated = (fieldName: string, fieldValue: string) => {
    const updatedErroredFields = erroredFields.filter(
      field => field !== fieldName,
    );

    if (isSubmitting && (!fieldValue || fieldValue.trim().length === 0)) {
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
        placeholder={formInput.placeholder || ''}
        multiline
        numberOfLines={4}
        value={formData[formInput.name] || ''}
        onChangeText={text => fieldUpdated(formInput.name, text)}
        style={[styles.formTextInput, isErrored && styles.erroredInput]}
      />
    </View>
  );
};

export default FormTextarea;
