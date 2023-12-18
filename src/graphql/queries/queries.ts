import { gql } from '@apollo/client';

export const POPULAR_REPOS_QUERY = gql`
  query GetPopularRepos($after: String, $query: String!, $first: Int) {
    search(type: REPOSITORY, query: $query, first: $first, after: $after) {
        repositoryCount
        edges {
          cursor
          node {
            ... on Repository {
              forkCount
              name
              url
              stargazerCount
            }
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
