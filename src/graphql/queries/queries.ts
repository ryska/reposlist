import { gql } from '@apollo/client';

export const POPULAR_REPOS_QUERY = gql`
  query PopularRepos(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $query: String!
  ) {
    search(
      type: REPOSITORY
      first: $first
      after: $after
      last: $last
      before: $before
      query: $query
    ) {
      nodes {
        ... on Repository {
          forkCount
          url
          stargazerCount
          name
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
