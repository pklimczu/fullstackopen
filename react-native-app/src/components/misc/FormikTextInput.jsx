import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from '../TextInput';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 2,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 5,
    color: theme.colors.errorColor,
    fontSize: theme.fontSizes.small
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;