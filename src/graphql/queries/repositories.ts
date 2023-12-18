import { gql } from '@apollo/client';

export const POPULAR_REPOS_QUERY = gql`
  query GetPopularRepos($after: String, $query: String!, $first: Int) {
    search(type: REPOSITORY, after: $after, query: $query, first: $first) {
      edges {
        node {
          ... on Repository {
            name
            url
            stargazerCount
            forkCount
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
