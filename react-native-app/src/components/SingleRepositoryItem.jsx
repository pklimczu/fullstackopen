import { useQuery } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { GET_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import { RepositoryItemContainer } from './RepositoryItem';
import { FlatList } from 'react-native';
import ItemSeparator from './misc/ItemSeparator';
import ReviewListItem from './RepositoryItemComponents/ReviewListItem';

const SingleRepositoryItem = ({ match, showButton }) => {
    const [reviews, setReviews] = useState([]);
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
            variables: { id, first: 2 }
        });

    const fetchData = async () => {
        if (!repository.loading && !review.loading) {
            setIsLoaded(true);
            setReviews(review.data.repository.reviews.edges.map(edge => edge.node));
        }
    };

    const handleFetchMoreReviews = () => {
        const canFetchMore = !review.loading && review.data.repository && review.data.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
          return;
        }
    
        review.fetchMore({
          query: GET_REVIEWS,
          variables: {
            after: review.data.repository.reviews.pageInfo.endCursor,
            id: id, first: 2,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const nextResult = {
                repository: {
                    ...fetchMoreResult.repository,
                    reviews: {
                        ...fetchMoreResult.repository.reviews,
                        edges: [
                            ...previousResult.repository.reviews.edges,
                            ...fetchMoreResult.repository.reviews.edges,
                        ]
                    }
                }
            };
            setReviews(nextResult);
            console.log("NEXT:", nextResult);
            return nextResult;
          },
        });
      };

    useEffect(() => {
        fetchData();
    }, [isLoaded, repository, review]);
          
    const onEndReach = () => {
        handleFetchMoreReviews();
    };

    const headerComponent = (review.data && isLoaded) ? repository.data.repository : undefined;

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewListItem review={item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(repo) => repo["id"]}
            ListHeaderComponent={() => <RepositoryItemContainer item={headerComponent} showButton={showButton} />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default SingleRepositoryItem;