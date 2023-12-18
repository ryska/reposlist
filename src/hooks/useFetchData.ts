import { useEffect } from 'react';
import { ApolloError, useQuery, useReactiveVar } from '@apollo/client';
import { RepoListData, RepoListVariables } from '../graphql/types/ReposQuery';
import { POPULAR_REPOS_QUERY } from '../graphql/queries/repositories';
import { repositoriesVar, searchValueVar } from '../utils/variables';

export const useFetchData = (): FetchDataHandlers => {
  const searchValue = useReactiveVar(searchValueVar);
  const repositories = useReactiveVar(repositoriesVar);
  const query = `language:javascript topic:react ${searchValue}`;

  const { loading, error, data, fetchMore } = useQuery<
    RepoListData,
    RepoListVariables
  >(POPULAR_REPOS_QUERY, {
    variables: {
      first: 10,
      query,
    } as RepoListVariables,
  });

  useEffect(() => {
    data && repositoriesVar(data);
  }, [data]);

  const handleLoadMore = () => {
    const lastCursor = repositories.search.pageInfo.endCursor;
    if (!lastCursor) {
      console.error('Unable to determine the last cursor for pagination.');
      return;
    }
    fetchMore({
      variables: {
        after: lastCursor,
        first: 10,
        query,
      } as RepoListVariables,
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousQueryResult;
        repositoriesVar(fetchMoreResult);
        return {
          ...fetchMoreResult,
          search: {
            ...fetchMoreResult.search,
            edges: [
              ...previousQueryResult.search.edges,
              ...fetchMoreResult.search.edges,
            ],
          },
        };
      },
    });
  };

  return { loading, error, handleLoadMore };
};

export type FetchDataHandlers = {
  loading: boolean;
  error: ApolloError | undefined;
  handleLoadMore: () => void;
};
