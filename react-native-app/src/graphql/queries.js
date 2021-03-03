import { gql } from 'apollo-boost';
import { REPOSITORY_GENERAL } from './fragments';

export const GET_REPOSITORIES = gql`
    query getRepositories(
        $orderDirection: OrderDirection
        $orderBy: AllRepositoriesOrderBy
        $after: String
        $first: Int
    ){
        repositories(after: $after, first: $first, orderDirection: $orderDirection, orderBy: $orderBy) {
            edges {
                node {
                    ...RepositoryGeneral
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                totalCount
                hasNextPage
            }
        }
    }
    ${REPOSITORY_GENERAL}
`;

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id) {
            ...RepositoryGeneral,
            url
        }
    }
    ${REPOSITORY_GENERAL}
`;

export const GET_REVIEWS = gql`
    query getReviews(
        $id: ID!
        $after: String
        $first: Int
    ) {
        repository(id: $id) {
            id
            fullName
            reviews(after: $after, first: $first) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
                pageInfo {
                    endCursor
                    startCursor
                    totalCount
                    hasNextPage
                }
            }
        }
    }
`;

export const MY_REVIEWS = gql`
    query myReviews($includeReviews: Boolean = true) {
    authorizedUser {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
                node {
                    id
                    text
                    rating
                    createdAt
                    repository {
                        id
                        fullName
                    }
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
}
`;