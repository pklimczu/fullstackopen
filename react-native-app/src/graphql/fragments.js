import { gql } from 'apollo-boost';

export const REPOSITORY_GENERAL = gql`
    fragment RepositoryGeneral on Repository {
        id,
        fullName,
        description,
        language,
        ownerAvatarUrl,
        stargazersCount,
        forksCount,
        reviewCount,
        ratingAverage
    }
`;