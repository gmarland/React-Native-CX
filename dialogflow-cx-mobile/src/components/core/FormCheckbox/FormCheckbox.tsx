import React from 'react';
import {Platform, Pressable, Text, View, ViewStyle} from 'react-native';
import Checkbox from '@react-native-community/checkbox';

import {IFormInput} from '../../../interfaces/form/IFormInput';

import ChatHTML from '../../chat/responses/ChatHTML/ChatHTML';

import {formStyles} from '../../form/ChatForm/ChatForm.styles';
import {styles} from './FormCheckbox.styles';

interface FormCheckboxProps {
  isSubmitting: boolean;
  formInput: IFormInput;
  erroredFields: string[];
  formData: Record<string, any>;
  setErroredFields: (erroredFields: string[]) => void;
  setFormData: (formData: Record<string, any>) => void;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  isSubmitting,
  formInput,
  erroredFields,
  formData,
  setErroredFields,
  setFormData,
}) => {
  const handleCheckboxToggle = (fieldName: string, fieldValue: string) => {
    const updatedErroredFields = erroredFields.includes(fieldName)
      ? erroredFields.filter(field => field !== fieldName)
      : !fieldValue
      ? [...erroredFields, fieldName]
      : erroredFields;

    if (isSubmitting) {
      setErroredFields(updatedErroredFields);
    }

    const currentValues = formData[fieldName]?.split(',') || [];
    const updatedValues = currentValues.includes(fieldValue)
      ? currentValues.filter((value: string) => value !== fieldValue)
      : [...currentValues, fieldValue];

    setFormData({
      ...formData,
      [fieldName]: updatedValues.join(','),
    });
  };

  const isCheckboxSelected = (
    fieldName: string,
    fieldValue: string,
  ): boolean => {
    const currentValues = formData[fieldName]?.split(',') || [];
    return currentValues.includes(fieldValue);
  };

  const getCheckboxStyle = (isErrored: boolean) => {
    const tintColor = isErrored ? '#ff0000' : '#000000';
    return Platform.OS === 'ios'
      ? ({tintColor} as ViewStyle)
      : ({tintColors: {true: tintColor, false: tintColor}} as ViewStyle);
  };

  return (
    <View>
      <Text style={formStyles.formInputLabel}>{formInput.label}</Text>
      <View style={styles.checkboxList}>
        <View style={styles.checkboxOptionsList}>
          {formInput?.options?.map((option, index) => {
            const isErrored = erroredFields.includes(formInput.name);
            return (
              <Pressable
                key={`${formInput.name}_${index}`}
                onPress={() => handleCheckboxToggle(formInput.name, option)}>
                <View style={styles.formCheckboxInput}>
                  <View style={{flex: 1}}>
                    <ChatHTML
                      textToRender={option}
                      baseStyle={{
                        color: isErrored ? '#FF0000' : '#000000',
                        fontSize: 17,
                      }}
                    />
                  </View>
                  <Checkbox
                    boxType="square"
                    style={getCheckboxStyle(isErrored)}
                    value={isCheckboxSelected(formInput.name, option)}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FormCheckbox;
