import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import { RepositoryItemContainer } from './RepositoryItem';
import { FlatList, Text } from 'react-native';
import ItemSeparator from './misc/ItemSeparator';
import ReviewListItem from './RepositoryItemComponents/ReviewListItem';

const SingleRepositoryItem = ({ match, showButton }) => {
    console.log("-----------------------");

    const [isLoaded, setIsLoaded] = useState(false);
    const id = match["params"]["id"];

    const repository = useQuery(GET_REPOSITORY,
        { 
            fetchPolicy: 'cache-and-network',
            variables: { id }
        });
    const review = useQuery(GET_REVIEWS,
        { 
            fetchPolicy: 'cache-and-network',
            variables: { id }
        });

    const fetchData = async () => {
        if (!repository.loading && !review.loading) {
            setIsLoaded(true);
            console.log(repository.data.repository);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isLoaded, repository, review]);
          
    if (!isLoaded) {
        return <Text>Loading</Text>;
    }

    return (
        <FlatList
            data={review.data.repository.reviews.edges}
            renderItem={({ item }) => <ReviewListItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItemContainer item={repository.data.repository} showButton={showButton} />}
        />
    );
};

export default SingleRepositoryItem;