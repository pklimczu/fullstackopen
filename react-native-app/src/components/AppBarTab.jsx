import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const AppBarTab = ({ text }) => {

    const styles = StyleSheet.create({       
        text: {
            fontSize: 20,
            color: theme.colors.appBarText,
            padding: 15,
        }
      });

    return (
        <TouchableWithoutFeedback>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableWithoutFeedback>
    );
};

export default AppBarTab;