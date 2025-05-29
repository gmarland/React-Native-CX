import React from 'react';
import {Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {IFormInput} from '../../../interfaces/form/IFormInput';
import {formStyles} from '../../form/ChatForm/ChatForm.styles';
import {pickerSelectStyles} from './FormSelect.styles';

interface FormSelectProps {
  isSubmitting: boolean;
  erroredFields: string[];
  formInput: IFormInput;
  formData: Record<string, any>;
  setErroredFields: (erroredFields: string[]) => void;
  setFormData: (formData: Record<string, any>) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  isSubmitting,
  erroredFields,
  formInput,
  formData,
  setErroredFields,
  setFormData,
}) => {
  const fieldUpdated = (fieldName: string, fieldValue: string | null) => {
    const updatedErroredFields = erroredFields.filter(ef => ef !== fieldName);

    if (isSubmitting && (!fieldValue || fieldValue.length === 0)) {
      updatedErroredFields.push(fieldName);
    }

    setErroredFields(updatedErroredFields);

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const pickerItems =
    formInput.options?.map(option => ({
      label: option,
      value: option,
    })) || [];

  return (
    <View>
      <Text style={formStyles.formInputLabel}>{formInput.label}</Text>
      <RNPickerSelect
        onValueChange={value => fieldUpdated(formInput.name, value)}
        items={pickerItems}
        style={pickerSelectStyles}
        value={formData[formInput.name]}
        placeholder={{
          label: formInput.placeholder || 'Choose an option...',
          value: null,
        }}
      />
    </View>
  );
};

export default FormSelect;
