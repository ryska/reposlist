import { useQuery } from "@apollo/client";
import { POPULAR_REPOS_QUERY } from "../graphql/queries/queries";
import { RepoListData, RepoListVariables } from "../graphql/types/ReposQuery";
import { useEffect, useState } from "react";
import { Repository } from "../utils/types";

export const useFetchData = () => {
  const [repositories, setRepositiries] = useState<Repository[]>([]);
  const { loading, error, data, fetchMore } = useQuery<RepoListData, RepoListVariables>(
    POPULAR_REPOS_QUERY,
    {
      variables: {
        first: 10,
      },
    }
  );
  useEffect(() => {
    const repos = data && data.search.nodes && data.search.nodes as unknown as Repository[];
    repos && setRepositiries(repos)
  }, [data])

  const handleShowMore = () => {
    fetchMore({
      variables: { after: data?.search.pageInfo.endCursor, first: 10 },
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
  return { loading, error, repositories, handleShowMore }
};
