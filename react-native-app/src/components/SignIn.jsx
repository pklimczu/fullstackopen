import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import * as yup from 'yup';

const SignIn = ({ setUserLogged }) => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      setUserLogged(true);
    } catch (e) {
      console.log(e);
    }
};

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(5, "The minimum length of username is 5."),
    password: yup.string().required().min(7, "The minimum length of username is 5."),
  });

  const styles = StyleSheet.create({       
    signinButton: {
        fontSize: theme.fontSizes.body,
        margin: 5,
        marginRight: 15,
        marginLeft: 15,
        backgroundColor: theme.colors.primary,
        textAlign: 'center',
        padding: 10,
        color: 'white',
        borderRadius: 3
    }
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => {return (
      <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <Text style={styles.signinButton}>Sign in</Text>
        </TouchableWithoutFeedback>
      </View>);
      }}
    </Formik>
  );
};

export default SignIn;