import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    textInputStyle: {
        backgroundColor: 'white',
        margin: 5,
        marginRight: 15,
        marginLeft: 15,
        padding: 5,
        paddingLeft: 10,
        borderColor: theme.colors.borderColor,
        borderWidth: 1,
        borderRadius: 4,
        fontSize: theme.fontSizes.body,
    },
    error: {
      borderColor: theme.colors.errorColor
    }
});

const TextInput = ({ error, ...props }) => {
  const isErrorPresent = error ? true : false;
  
  return <NativeTextInput style={[styles.textInputStyle, isErrorPresent && styles.error]} {...props} />;
};

export default TextInput;