import { useQuery } from "@apollo/client";
import { POPULAR_REPOS_QUERY } from "../graphql/queries/queries";
import { RepoListData, RepoListVariables } from "../graphql/types/ReposQuery";
import { useEffect, useState } from "react";
import { Repository } from "../utils/types";
import { repositories as repositoriesVar } from "../utils/variables";

export const useFetchData = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore, refetch } = useQuery<RepoListData, RepoListVariables>(
    POPULAR_REPOS_QUERY,
    {
      variables: {
        first: 10,
        query: `language:javascript topic:react`,
      },
    }
  );

  useEffect(() => {
    const repos = data && data.search.nodes && data.search.nodes as unknown as Repository[];
    if (repos) {
      setRepositories(repos)
      repositoriesVar(repos)
    } 
  }, [data]);

  useEffect(() => {
    refetch({
      first: 10,
      query: `language:javascript topic:react ${searchValue}`,
    });
  }, [searchValue, refetch]);

  const handleShowMore = () => {
    fetchMore({
      variables: { after: data?.search.pageInfo.endCursor, first: 10, query: `language:javascript topic:react ${searchValue}` },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          search: {
            ...fetchMoreResult.search,
            nodes: [...prev.search.nodes, ...fetchMoreResult.search.nodes],
          },
        };
      },
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return { loading, error, repositories, searchValue, currentPage, handleShowMore, setSearchValue, handleNextPage, handlePrevPage };
};
