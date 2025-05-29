import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {IFormInput} from '../../../interfaces/form/IFormInput';
import ChatHTML from '../../chat/responses/ChatHTML/ChatHTML';
import {formStyles} from '../../form/ChatForm/ChatForm.styles';

import {styles} from './FormRadio.styles';

interface FormRadioProps {
  isSubmitting: boolean;
  erroredFields: string[];
  formInput: IFormInput;
  formData: Record<string, any>;
  setErroredFields: (erroredFields: string[]) => void;
  setFormData: (formData: Record<string, any>) => void;
}

interface RadioButtonProps {
  selected: boolean;
  color: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({selected, color}) => (
  <View style={[styles.container, {borderColor: color}]}>
    {selected && (
      <View style={[styles.innerCircle, {backgroundColor: color}]} />
    )}
  </View>
);

const FormRadio: React.FC<FormRadioProps> = ({
  isSubmitting,
  erroredFields,
  formInput,
  formData,
  setErroredFields,
  setFormData,
}) => {
  const handleRadioChange = (fieldName: string, fieldValue: string) => {
    const updatedErroredFields = erroredFields.filter(
      field => field !== fieldName,
    );

    if (isSubmitting && (!fieldValue || fieldValue.length === 0)) {
      updatedErroredFields.push(fieldName);
    }

    setErroredFields(updatedErroredFields);
    setFormData({...formData, [fieldName]: fieldValue});
  };

  const isErrored = erroredFields.includes(formInput.name);

  return (
    <View>
      <Text style={formStyles.formInputLabel}>{formInput.label}</Text>
      <View style={styles.checkboxList}>
        <View style={styles.checkboxOptionsList}>
          {formInput?.options?.map((option, index) => (
            <Pressable
              key={`${index}_opt`}
              onPress={() => handleRadioChange(formInput.name, option)}>
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
                <RadioButton
                  selected={formData[formInput.name] === option}
                  color={isErrored ? '#FF0000' : '#000000'}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FormRadio;
