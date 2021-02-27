import { gql } from 'apollo-boost';
import { REPOSITORY_GENERAL } from './fragments';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    ...RepositoryGeneral
                }
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
    query getReviews($id: ID!) {
        repository(id: $id) {
            id
            fullName
            reviews {
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
            }
        }
    }
`;