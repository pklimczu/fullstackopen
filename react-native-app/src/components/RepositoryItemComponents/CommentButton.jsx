import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    button: {
        fontSize: theme.fontSizes.subheading,
        backgroundColor: 'blue',
        borderRadius: 3,
        flex: 0.5,
        margin: 5,
    },
    buttonAlert: {
        fontSize: theme.fontSizes.subheading,
        backgroundColor: 'red',
        borderRadius: 3,
        flex: 0.5,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        padding: 8,
        textAlign: 'center'
    },
  });

const CommentButton = ({ text, alertStatus, action }) => {

    return <TouchableHighlight style={alertStatus ? styles.button && styles.buttonAlert : styles.button} onPress={action}>
        <Text style={styles.buttonText}>
            {text}
        </Text>
    </TouchableHighlight>;
};

export default CommentButton;