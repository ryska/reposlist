import { gql } from "@apollo/client";

export const POPULAR_REPOS_QUERY = gql`
  query PopularRepos($after: String, $before: String, $query: String!) {
    search(type: REPOSITORY, first: 10, after: $after, before: $before, query: $query) {
      nodes {
        ... on Repository {
          forkCount
          url
          stargazerCount
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;