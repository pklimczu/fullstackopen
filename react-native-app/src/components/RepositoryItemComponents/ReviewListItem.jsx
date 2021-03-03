import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { DELETE_REVIEW } from '../../graphql/mutations';
import theme from '../../theme';
import CommentButton from './CommentButton';

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
    },
    buttonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    }
});

const ReviewListItemContainer = ({ review, showButtons, refetchHandler }) => {
    const [mutate] = useMutation(DELETE_REVIEW);

    const rating = review["rating"];
    const author = review["user"]["username"];
    const comment = review["text"];
    const createdAt = review["createdAt"];

    const handleViewRepository = ({ review }) => {
        const url = review["repository"]["url"];
        Linking.openURL(url);
    };

    const handleDeleteReview = () => {
        Alert.alert(
            "Delete review",
            "Are you sure?",
            [
                {
                text: "Sure!",
                onPress: async () => {
                    const reviewId = review["id"];
                    await mutate({variables: {id: reviewId}});
                    refetchHandler();
                }
                },
                {
                    text: "No",
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.rating}>{rating}/100</Text>
            <Text style={styles.comment}>{comment}</Text>
            <Text style={styles.author}>~{author}</Text>
            <Text style={styles.createdAt}>{createdAt}</Text>
            {showButtons && <View style={styles.buttonContainer}>
                    <CommentButton text="View repository" alertStatus={false} action={() => handleViewRepository({ review })} />
                    <CommentButton text="Delete review" alertStatus={true} action={handleDeleteReview} />
                </View>}
        </View>
    );
};

const ReviewListItem = ({ review, showButtons, refetchHandler }) => {

    return <ReviewListItemContainer review={review} showButtons={showButtons} refetchHandler={refetchHandler} />;
};

export default ReviewListItem;