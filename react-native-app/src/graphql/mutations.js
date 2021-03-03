import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;

export const SIGN_UP = gql`
  mutation signUp($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repositoryName: String!
    $owner: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $owner
        rating: $rating
        text: $review
      }
    ) {
      repositoryId
    }
  }
`;