import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },

    textContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        padding: 5,
        flexShrink: 1
    },

    avatar: {
        width: 50,
        height: 50,
        flexGrow: 0,
        margin: 5,
        borderRadius: 5
    },

    mainText: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        paddingBottom: 5
    },

    description: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal,
        paddingBottom: 5,
        alignSelf: 'flex-start',
        color: theme.colors.textSecondary
    },

    languageContainer: {
        backgroundColor: theme.colors.backgroundLanguage,
        padding: 5,
        borderRadius: 3,
        color: 'white',
        alignSelf: 'flex-start'
    },

    languageText: {
        color: 'white'
    }
});

const TopPart = ({ item }) => {

    return (
        <View style={styles.container}>
            <Image source={{uri: item["ownerAvatarUrl"]}} style={styles.avatar} />
            <View style={styles.textContainer}>
                <Text style={styles.mainText}>{item["fullName"]}</Text>
                <Text style={styles.description}>{item["description"]}</Text>
                <View style={styles.languageContainer}>
                    <Text style={styles.languageText}>{item["language"]}</Text>
                </View>
            </View>
        </View>
    );
};

export default TopPart;