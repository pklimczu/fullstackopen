import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        paddingTop: 0,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },

    number: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading - 1.5,
        paddingBottom: 3,
        textAlign: 'center'
    },

    info: {
        color: theme.colors.textSecondary,
        textAlign: 'center'
    }
});

const StatItem = ({ number, info }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{number}</Text>
            <Text style={styles.info}>{info}</Text>
        </View>
    );
};

export default StatItem;