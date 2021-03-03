import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { FlatList } from 'react-native';
import { MY_REVIEWS } from '../../graphql/queries';
import ItemSeparator from '../misc/ItemSeparator';
import ReviewListItem from '../RepositoryItemComponents/ReviewListItem';

const MyReviews = () => {
    const reviews = useQuery(MY_REVIEWS);
    const data = reviews.data ? reviews.data.authorizedUser.reviews.edges.map(edge => edge.node) : [];

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ReviewListItem review={item} showButtons={true} refetchHandler={reviews.refetch} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(repo) => repo["id"]}
        />
    );
};

export default MyReviews;