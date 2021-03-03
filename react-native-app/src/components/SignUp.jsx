import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './misc/FormikTextInput';
import useSignUp from '../hooks/useSignUp';
import * as yup from 'yup';

export const SignUpContainer = ({onSubmit}) => {
  const initialValues = {
    username: '',
    password: '',
    repeatPassword: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(1, "The minimum length of username is 5.").max(30),
    password: yup.string().required().min(5, "The minimum length of username is 5.").max(50),
    repeatPassword: yup.string().required().min(5, "The minimum length of username is 5.").max(50).oneOf([yup.ref('password'), null]),
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
        <FormikTextInput name="repeatPassword" placeholder="Repeat password" secureTextEntry={true} />
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <Text style={styles.signinButton} testID="button">Sign up</Text>
        </TouchableWithoutFeedback>
      </View>);
      }}
    </Formik>
  );
};

const SignUp = () => {
    const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;
    
    try {
        await signUp({ username, password });
    } catch (e) {
        console.log(e);
    }
};

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;