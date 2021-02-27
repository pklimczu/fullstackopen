import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../theme';
import StatItem from './StatItem';

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column'
    },

    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },

    languageContainer: {
        backgroundColor: theme.colors.backgroundLanguage,
        padding: 15,
        margin: 15,
        borderRadius: 3,
        color: 'white',
        flex: 1,
        justifyContent: 'center'
    },

    languageText: {
        color: 'white',
        textAlign: 'center',
    }
});

const BottomPart = ({ item, showButton }) => {

    const roundIfNeeded = (number) => {
        if (number < 1000) {
            return number;
        }

        number = Math.round(number / 100);
        return number/10 + 'k';
    };

    const getStargazerCount = () => {
        return roundIfNeeded(item["stargazersCount"]);
    };

    const getForksCount = () => {
        return roundIfNeeded(item["forksCount"]);
    };

    const getReviewCount = () => {
        return roundIfNeeded(item["reviewCount"]);
    };

    const getRatingAverage = () => {
        return roundIfNeeded(item["ratingAverage"]);
    };

    const onPressHandler = () => {
        Linking.openURL(item["url"]);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <StatItem number={getStargazerCount()} info="Stars" />
                <StatItem number={getForksCount()} info="Forks" />
                <StatItem number={getReviewCount()} info="Reviews" />
                <StatItem number={getRatingAverage()} info="Rating" />
            </View>
            {showButton && 
                <TouchableOpacity onPress={onPressHandler}>
                    <View style={styles.languageContainer}>
                        <Text style={styles.languageText} testID="language">Open Github</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
};

export default BottomPart;