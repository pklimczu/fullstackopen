import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundContainer,
        marginBottom: 10,
        padding: 5
    },
    rating: {
        color: theme.colors.ratingColor,
        fontSize: theme.fontSizes.subheading,
        padding: 2,
        fontWeight: '700',
    },
    comment: {
        padding: 4
    },
    author: {
        textAlign: 'right',
        padding: 3
    },
    createdAt: {
        textAlign: 'right',
        padding: 3,
        fontSize: 9
    }
});

const ReviewListItem = ({ review }) => {

    const rating = review["node"]["rating"];
    const author = review["node"]["user"]["username"];
    const comment = review["node"]["text"];
    const createdAt = review["node"]["createdAt"];

    return (
        <View style={styles.container}>
            <Text style={styles.rating}>{rating}/100</Text>
            <Text style={styles.comment}>{comment}</Text>
            <Text style={styles.author}>~{author}</Text>
            <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
    );
};

export default ReviewListItem;