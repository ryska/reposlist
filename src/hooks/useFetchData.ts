import { useQuery, useReactiveVar } from "@apollo/client";
import { POPULAR_REPOS_QUERY } from "../graphql/queries/queries";
import { RepoListData, RepoListVariables } from "../graphql/types/ReposQuery";
import { useEffect } from "react";
import { repositoriesVar, searchValueVar } from "../utils/variables";

export const useFetchData = () => {
  const searchValue = useReactiveVar(searchValueVar);
  const repositories = useReactiveVar(repositoriesVar);
  const query = `language:javascript topic:react ${searchValue}`;

  const { loading, error, data, fetchMore } = useQuery<RepoListData, RepoListVariables>(
    POPULAR_REPOS_QUERY,
    {
      variables: {
        first: 10,
        query
      },
    }
  );

  useEffect(() => {
    data && repositoriesVar(data)
  }, [data]);

  const handleShowMore = ({ after, before }: { after?: string; before?: string }) => {
    fetchMore({
      variables: { after, before, query },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const nextRepos = fetchMoreResult;
        repositoriesVar(nextRepos);
        return {
          search: {
            ...fetchMoreResult.search,
            nodes: [...fetchMoreResult.search.nodes],
          },
        };
      },
    });
  };

  const handleNextPage = () => {
    handleShowMore({ after: repositories.search.pageInfo.endCursor, before: undefined });
  };

  const handlePrevPage = () => {
    handleShowMore({ after: undefined, before: repositories.search.pageInfo.startCursor });

  };

  return { loading, error, handleNextPage, handlePrevPage };
};
