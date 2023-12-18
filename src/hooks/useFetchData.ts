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

  const handleShowMore = ({ after, before, first }: {
    after: string | null;
    before: string | null;
    first: number;
  }) => {
    fetchMore({
      variables: { after, before, query, first },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousQueryResult;
        repositoriesVar(fetchMoreResult);
   
        return {
          ...fetchMoreResult,
          search: {
            ...fetchMoreResult.search,
            edges: fetchMoreResult.search.edges,
          },
        } as RepoListData;
      },
    });
  };
  const handleNextPage = () => {
    handleShowMore({
      after: repositories && repositories.search.pageInfo.endCursor,
      before: null,
      first: 10,
    });
  };

  const handlePrevPage = () => {
    handleShowMore({
      after: null,
      before: repositories && repositories.search.edges[0].cursor,
      first: 10,
    });
  };

  return { loading, error, handleNextPage, handlePrevPage };
};
