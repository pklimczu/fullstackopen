import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../misc/FormikTextInput';
import * as yup from 'yup';
import useCreateReview from '../../hooks/useCreateReview';

const CreateReviewContainer = ({ onSubmit }) => {
    const initialValues = {
        owner: '',
        repositoryName: '',
        rating: 0,
        review: '',
      };
    
      const validationSchema = yup.object().shape({
        owner: yup.string().required(),
        repositoryName: yup.string().required(),
        rating: yup.number().min(0).max(100).required(),
        review: yup.string(),
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
            <FormikTextInput name="owner" placeholder="owner" />
            <FormikTextInput name="repositoryName" placeholder="repository name" />
            <FormikTextInput name="rating" placeholder="50" />
            <FormikTextInput name="review" placeholder="review" />
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <Text style={styles.signinButton} testID="button">Rate</Text>
            </TouchableWithoutFeedback>
          </View>);
          }}
        </Formik>
      );    
};

const CreateReview = () => {
    const [addReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { owner, repositoryName, rating, review } = values;
        
        try {
            await addReview({ owner, repositoryName, rating: Number(rating), review });
          } catch (e) {
            console.log(e);
          }
    };
    
    return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;