import { gql } from "@apollo/client";

export const POPULAR_REPOS_QUERY = gql`
query PopularRepos($first: Int, $after: String) {
    search(type: REPOSITORY, first: $first, after: $after, query: "language:javascript topic:react") {
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

