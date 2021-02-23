import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;