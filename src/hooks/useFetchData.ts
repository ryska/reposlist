import { useQuery, useReactiveVar } from '@apollo/client';
import { POPULAR_REPOS_QUERY } from '../graphql/queries/queries';
import { RepoListData, RepoListVariables } from '../graphql/types/ReposQuery';
import { useEffect } from 'react';
import { repositoriesVar, searchValueVar } from '../utils/variables';

export const useFetchData = () => {
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
    },
  });

  useEffect(() => {
    data && repositoriesVar(data);
  }, [data]);

  const handleShowMore = () => {
    const lastCursor = repositories.search.pageInfo.endCursor;
    fetchMore({
      variables: {
        after: lastCursor,
        first: 10,
        query,
      },
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
  const handleLoadMore = () => {
    handleShowMore();
  };

  return { loading, error, handleLoadMore };
};
