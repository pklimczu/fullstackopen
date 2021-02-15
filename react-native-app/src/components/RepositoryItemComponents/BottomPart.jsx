import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatItem from './StatItem';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

const BottomPart = ({ item }) => {

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

    return (
        <View style={styles.container}>
            <StatItem number={getStargazerCount()} info="Stars" />
            <StatItem number={getForksCount()} info="Forks" />
            <StatItem number={getReviewCount()} info="Reviews" />
            <StatItem number={getRatingAverage()} info="Rating" />
        </View>
    );
};

export default BottomPart;