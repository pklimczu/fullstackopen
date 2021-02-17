import React from 'react';
import { StyleSheet } from 'react-native';
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
        <Text style={styles.text}>
            {text}
        </Text>
    );
};

export default AppBarTab;